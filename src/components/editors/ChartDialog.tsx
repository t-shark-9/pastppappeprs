import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, Plus, Trash2 } from "lucide-react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  AreaChart,
  Area,
  ErrorBar,
  ComposedChart,
} from "recharts";

interface ChartDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onInsertChart: (imageDataUrl: string, rawData?: string) => void;
  /** Pre-filled CSV data (e.g., from a table) */
  initialData?: string;
  /** Optional initial chart title */
  initialTitle?: string;
}

type ChartType = "bar" | "line" | "pie" | "scatter" | "area";
type RegressionType = "none" | "linear" | "polynomial" | "exponential" | "logarithmic" | "power";

// Matplotlib-inspired color palette
const COLORS = [
  "#1f77b4", // blue
  "#ff7f0e", // orange
  "#2ca02c", // green
  "#d62728", // red
  "#9467bd", // purple
  "#8c564b", // brown
  "#e377c2", // pink
  "#7f7f7f", // gray
  "#bcbd22", // olive
  "#17becf", // cyan
];

interface DataPoint {
  name: string;
  value: number;
  errorY?: number;  // Y error bars
  errorX?: number;  // X error bars
  xNumeric?: number;
}

interface DataSeries {
  id: string;
  name: string;
  data: string;
  color: string;
  showErrorBars: boolean;
}

// Regression calculation functions
function calculateLinearRegression(data: DataPoint[]): { slope: number; intercept: number; r2: number; equation: string } | null {
  if (data.length < 2) return null;
  
  const points = data.map((d, i) => ({ x: d.xNumeric ?? i, y: d.value }));
  const n = points.length;
  const sumX = points.reduce((sum, p) => sum + p.x, 0);
  const sumY = points.reduce((sum, p) => sum + p.y, 0);
  const sumXY = points.reduce((sum, p) => sum + p.x * p.y, 0);
  const sumX2 = points.reduce((sum, p) => sum + p.x * p.x, 0);
  
  const denominator = n * sumX2 - sumX * sumX;
  if (denominator === 0) return null;
  
  const slope = (n * sumXY - sumX * sumY) / denominator;
  const intercept = (sumY - slope * sumX) / n;
  
  const yMean = sumY / n;
  const ssTotal = points.reduce((sum, p) => sum + Math.pow(p.y - yMean, 2), 0);
  const ssResidual = points.reduce((sum, p) => sum + Math.pow(p.y - (slope * p.x + intercept), 2), 0);
  const r2 = ssTotal === 0 ? 0 : 1 - ssResidual / ssTotal;
  
  const sign = intercept >= 0 ? "+" : "-";
  const equation = `y = ${slope.toFixed(4)}x ${sign} ${Math.abs(intercept).toFixed(4)}`;
  
  return { slope, intercept, r2, equation };
}

function calculatePolynomialRegression(data: DataPoint[], degree: number = 2): { coefficients: number[]; r2: number; equation: string; predict: (x: number) => number } | null {
  if (data.length < degree + 1) return null;
  
  const points = data.map((d, i) => ({ x: d.xNumeric ?? i, y: d.value }));
  const n = points.length;
  
  // Build Vandermonde matrix
  const X: number[][] = [];
  const Y: number[] = [];
  
  for (const p of points) {
    const row: number[] = [];
    for (let j = 0; j <= degree; j++) {
      row.push(Math.pow(p.x, j));
    }
    X.push(row);
    Y.push(p.y);
  }
  
  // Solve normal equations: (X^T * X) * coeffs = X^T * Y
  const XtX: number[][] = Array(degree + 1).fill(null).map(() => Array(degree + 1).fill(0));
  const XtY: number[] = Array(degree + 1).fill(0);
  
  for (let i = 0; i <= degree; i++) {
    for (let j = 0; j <= degree; j++) {
      for (let k = 0; k < n; k++) {
        XtX[i][j] += X[k][i] * X[k][j];
      }
    }
    for (let k = 0; k < n; k++) {
      XtY[i] += X[k][i] * Y[k];
    }
  }
  
  // Gaussian elimination
  const augmented = XtX.map((row, i) => [...row, XtY[i]]);
  for (let i = 0; i <= degree; i++) {
    let maxRow = i;
    for (let k = i + 1; k <= degree; k++) {
      if (Math.abs(augmented[k][i]) > Math.abs(augmented[maxRow][i])) maxRow = k;
    }
    [augmented[i], augmented[maxRow]] = [augmented[maxRow], augmented[i]];
    
    if (Math.abs(augmented[i][i]) < 1e-10) return null;
    
    for (let k = i + 1; k <= degree; k++) {
      const factor = augmented[k][i] / augmented[i][i];
      for (let j = i; j <= degree + 1; j++) {
        augmented[k][j] -= factor * augmented[i][j];
      }
    }
  }
  
  // Back substitution
  const coefficients: number[] = Array(degree + 1).fill(0);
  for (let i = degree; i >= 0; i--) {
    coefficients[i] = augmented[i][degree + 1];
    for (let j = i + 1; j <= degree; j++) {
      coefficients[i] -= augmented[i][j] * coefficients[j];
    }
    coefficients[i] /= augmented[i][i];
  }
  
  const predict = (x: number) => coefficients.reduce((sum, c, i) => sum + c * Math.pow(x, i), 0);
  
  // Calculate R²
  const yMean = points.reduce((sum, p) => sum + p.y, 0) / n;
  const ssTotal = points.reduce((sum, p) => sum + Math.pow(p.y - yMean, 2), 0);
  const ssResidual = points.reduce((sum, p) => sum + Math.pow(p.y - predict(p.x), 2), 0);
  const r2 = ssTotal === 0 ? 0 : 1 - ssResidual / ssTotal;
  
  // Build equation string
  const terms = coefficients.map((c, i) => {
    if (i === 0) return c.toFixed(4);
    if (i === 1) return `${c >= 0 ? "+" : "-"} ${Math.abs(c).toFixed(4)}x`;
    return `${c >= 0 ? "+" : "-"} ${Math.abs(c).toFixed(4)}x^${i}`;
  }).reverse().join(" ");
  const equation = `y = ${terms}`;
  
  return { coefficients, r2, equation, predict };
}

function calculateExponentialRegression(data: DataPoint[]): { a: number; b: number; r2: number; equation: string; predict: (x: number) => number } | null {
  if (data.length < 2) return null;
  
  // Filter positive y values for log transformation
  const points = data.filter(d => d.value > 0).map((d, i) => ({ x: d.xNumeric ?? i, y: d.value }));
  if (points.length < 2) return null;
  
  // Linear regression on ln(y)
  const logPoints = points.map(p => ({ x: p.x, y: Math.log(p.y) }));
  const n = logPoints.length;
  const sumX = logPoints.reduce((sum, p) => sum + p.x, 0);
  const sumY = logPoints.reduce((sum, p) => sum + p.y, 0);
  const sumXY = logPoints.reduce((sum, p) => sum + p.x * p.y, 0);
  const sumX2 = logPoints.reduce((sum, p) => sum + p.x * p.x, 0);
  
  const denominator = n * sumX2 - sumX * sumX;
  if (denominator === 0) return null;
  
  const b = (n * sumXY - sumX * sumY) / denominator;
  const lnA = (sumY - b * sumX) / n;
  const a = Math.exp(lnA);
  
  const predict = (x: number) => a * Math.exp(b * x);
  
  const yMean = points.reduce((sum, p) => sum + p.y, 0) / n;
  const ssTotal = points.reduce((sum, p) => sum + Math.pow(p.y - yMean, 2), 0);
  const ssResidual = points.reduce((sum, p) => sum + Math.pow(p.y - predict(p.x), 2), 0);
  const r2 = ssTotal === 0 ? 0 : 1 - ssResidual / ssTotal;
  
  const equation = `y = ${a.toFixed(4)}e^(${b.toFixed(4)}x)`;
  
  return { a, b, r2, equation, predict };
}

function calculateLogarithmicRegression(data: DataPoint[]): { a: number; b: number; r2: number; equation: string; predict: (x: number) => number } | null {
  if (data.length < 2) return null;
  
  // Filter positive x values for log transformation
  const points = data.filter(d => (d.xNumeric ?? 0) > 0).map((d, i) => ({ x: d.xNumeric ?? (i + 1), y: d.value }));
  if (points.length < 2) return null;
  
  // Linear regression with ln(x)
  const logPoints = points.map(p => ({ x: Math.log(p.x), y: p.y }));
  const n = logPoints.length;
  const sumX = logPoints.reduce((sum, p) => sum + p.x, 0);
  const sumY = logPoints.reduce((sum, p) => sum + p.y, 0);
  const sumXY = logPoints.reduce((sum, p) => sum + p.x * p.y, 0);
  const sumX2 = logPoints.reduce((sum, p) => sum + p.x * p.x, 0);
  
  const denominator = n * sumX2 - sumX * sumX;
  if (denominator === 0) return null;
  
  const a = (n * sumXY - sumX * sumY) / denominator;
  const b = (sumY - a * sumX) / n;
  
  const predict = (x: number) => a * Math.log(x) + b;
  
  const yMean = points.reduce((sum, p) => sum + p.y, 0) / n;
  const ssTotal = points.reduce((sum, p) => sum + Math.pow(p.y - yMean, 2), 0);
  const ssResidual = points.reduce((sum, p) => sum + Math.pow(p.y - predict(p.x), 2), 0);
  const r2 = ssTotal === 0 ? 0 : 1 - ssResidual / ssTotal;
  
  const sign = b >= 0 ? "+" : "-";
  const equation = `y = ${a.toFixed(4)}·ln(x) ${sign} ${Math.abs(b).toFixed(4)}`;
  
  return { a, b, r2, equation, predict };
}

function calculatePowerRegression(data: DataPoint[]): { a: number; b: number; r2: number; equation: string; predict: (x: number) => number } | null {
  if (data.length < 2) return null;
  
  // Filter positive x and y values
  const points = data.filter(d => (d.xNumeric ?? 0) > 0 && d.value > 0).map((d, i) => ({ x: d.xNumeric ?? (i + 1), y: d.value }));
  if (points.length < 2) return null;
  
  // Linear regression on ln(x) and ln(y)
  const logPoints = points.map(p => ({ x: Math.log(p.x), y: Math.log(p.y) }));
  const n = logPoints.length;
  const sumX = logPoints.reduce((sum, p) => sum + p.x, 0);
  const sumY = logPoints.reduce((sum, p) => sum + p.y, 0);
  const sumXY = logPoints.reduce((sum, p) => sum + p.x * p.y, 0);
  const sumX2 = logPoints.reduce((sum, p) => sum + p.x * p.x, 0);
  
  const denominator = n * sumX2 - sumX * sumX;
  if (denominator === 0) return null;
  
  const b = (n * sumXY - sumX * sumY) / denominator;
  const lnA = (sumY - b * sumX) / n;
  const a = Math.exp(lnA);
  
  const predict = (x: number) => a * Math.pow(x, b);
  
  const yMean = points.reduce((sum, p) => sum + p.y, 0) / n;
  const ssTotal = points.reduce((sum, p) => sum + Math.pow(p.y - yMean, 2), 0);
  const ssResidual = points.reduce((sum, p) => sum + Math.pow(p.y - predict(p.x), 2), 0);
  const r2 = ssTotal === 0 ? 0 : 1 - ssResidual / ssTotal;
  
  const equation = `y = ${a.toFixed(4)}x^${b.toFixed(4)}`;
  
  return { a, b, r2, equation, predict };
}

export function ChartDialog({
  open,
  onOpenChange,
  onInsertChart,
  initialData,
  initialTitle,
}: ChartDialogProps) {
  const [chartType, setChartType] = useState<ChartType>("scatter");
  const [chartTitle, setChartTitle] = useState(initialTitle || "");
  const defaultData = "0, 10.5, 0.5, 0.2\n1, 15.2, 0.8, 0.3\n2, 22.1, 1.2, 0.4\n3, 28.7, 1.5, 0.5\n4, 35.3, 1.8, 0.6";
  const [dataInput, setDataInput] = useState(initialData || defaultData);
  const [chartData, setChartData] = useState<DataPoint[]>([]);
  const [xAxisLabel, setXAxisLabel] = useState("");
  const [yAxisLabel, setYAxisLabel] = useState("");
  
  // Display options (simplified - all in one section)
  const [showGrid, setShowGrid] = useState(true);
  const [showLegend, setShowLegend] = useState(true);
  const [showDataPoints, setShowDataPoints] = useState(true);
  const [lineStyle, setLineStyle] = useState<"solid" | "dashed" | "dotted">("solid");
  const [markerStyle, setMarkerStyle] = useState<"circle" | "square" | "triangle" | "none">("circle");
  const [fontSize, setFontSize] = useState(11);
  const [colorScheme, setColorScheme] = useState<"default" | "colorblind" | "grayscale">("default");
  
  // Error bars
  const [showYErrorBars, setShowYErrorBars] = useState(false);
  const [showXErrorBars, setShowXErrorBars] = useState(false);
  
  // Regression/Curve fitting
  const [regressionType, setRegressionType] = useState<RegressionType>("none");
  const [polynomialDegree, setPolynomialDegree] = useState(2);
  
  // Multiple series support
  const [multipleSeriesMode, setMultipleSeriesMode] = useState(false);
  const [dataSeries, setDataSeries] = useState<DataSeries[]>([
    { id: "1", name: "Trial 1", data: defaultData, color: COLORS[0], showErrorBars: true }
  ]);

  // Color schemes
  const colorSchemes = {
    default: COLORS,
    colorblind: ["#0077BB", "#33BBEE", "#009988", "#EE7733", "#CC3311", "#EE3377", "#BBBBBB"],
    grayscale: ["#000000", "#333333", "#555555", "#777777", "#999999", "#BBBBBB", "#DDDDDD"],
  };

  const activeColors = colorSchemes[colorScheme];

  // Parse data with support for X and Y error values (x, y, yError, xError)
  // Moved before useMemo that depends on it
  const parseData = (input: string): DataPoint[] => {
    const lines = input.trim().split("\n");
    return lines
      .map((line, index) => {
        const parts = line.split(",").map((p) => p.trim());
        if (parts.length >= 2) {
          const value = parseFloat(parts[1]);
          if (!isNaN(value)) {
            const errorY = parts.length >= 3 ? parseFloat(parts[2]) : undefined;
            const errorX = parts.length >= 4 ? parseFloat(parts[3]) : undefined;
            const xNumeric = parseFloat(parts[0]);
            return { 
              name: parts[0], 
              value, 
              errorY: !isNaN(errorY!) ? errorY : undefined,
              errorX: !isNaN(errorX!) ? errorX : undefined,
              xNumeric: !isNaN(xNumeric) ? xNumeric : index,
            } as DataPoint;
          }
        }
        return null;
      })
      .filter((item): item is DataPoint => item !== null);
  };

  // Series management functions
  const addSeries = () => {
    const newId = String(Date.now());
    const colorIndex = dataSeries.length % activeColors.length;
    setDataSeries([...dataSeries, {
      id: newId,
      name: `Trial ${dataSeries.length + 1}`,
      data: "0, 0\n1, 1\n2, 2",
      color: activeColors[colorIndex],
      showErrorBars: true
    }]);
  };

  const removeSeries = (id: string) => {
    if (dataSeries.length > 1) {
      setDataSeries(dataSeries.filter(s => s.id !== id));
    }
  };

  const updateSeries = (id: string, field: keyof DataSeries, value: any) => {
    setDataSeries(dataSeries.map(s => 
      s.id === id ? { ...s, [field]: value } : s
    ));
  };

  // Parse all series data for multi-series mode
  const allSeriesData = useMemo(() => {
    if (!multipleSeriesMode) return null;
    return dataSeries.map(series => ({
      ...series,
      parsedData: parseData(series.data)
    }));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataSeries, multipleSeriesMode]);

  // Reset state when dialog opens with new initial data
  useEffect(() => {
    if (open) {
      const input = initialData || defaultData;
      setDataInput(input);
      setChartData(parseData(input));
      setChartTitle(initialTitle || "");
      // Reset to single series mode with initial data
      setMultipleSeriesMode(false);
      setDataSeries([{ id: "1", name: "Trial 1", data: input, color: COLORS[0], showErrorBars: true }]);
    }
  }, [open, initialData, initialTitle]);

  // handleDataChange uses parseData defined above

  const handleDataChange = (input: string) => {
    setDataInput(input);
    const parsed = parseData(input);
    if (parsed.length > 0) {
      setChartData(parsed);
    }
  };

  // Calculate regression based on selected type
  const regressionResult = useMemo(() => {
    if (regressionType === "none" || chartData.length < 2) return null;
    
    switch (regressionType) {
      case "linear":
        return calculateLinearRegression(chartData);
      case "polynomial":
        return calculatePolynomialRegression(chartData, polynomialDegree);
      case "exponential":
        return calculateExponentialRegression(chartData);
      case "logarithmic":
        return calculateLogarithmicRegression(chartData);
      case "power":
        return calculatePowerRegression(chartData);
      default:
        return null;
    }
  }, [chartData, regressionType, polynomialDegree]);
  
  // Generate regression line data points for plotting
  const regressionLineData = useMemo(() => {
    if (!regressionResult || !('predict' in regressionResult || 'slope' in regressionResult)) return null;
    
    const xValues = chartData.map((d, i) => d.xNumeric ?? i);
    const minX = Math.min(...xValues);
    const maxX = Math.max(...xValues);
    const step = (maxX - minX) / 50;
    
    const points: { x: number; y: number }[] = [];
    
    if ('predict' in regressionResult) {
      for (let x = minX; x <= maxX; x += step) {
        points.push({ x, y: regressionResult.predict(x) });
      }
    } else if ('slope' in regressionResult) {
      // Linear regression
      points.push({ x: minX, y: regressionResult.slope * minX + regressionResult.intercept });
      points.push({ x: maxX, y: regressionResult.slope * maxX + regressionResult.intercept });
    }
    
    return points;
  }, [chartData, regressionResult]);

  const handleInsert = async () => {
    const chartElement = document.getElementById("chart-preview");
    if (chartElement) {
      try {
        const { default: html2canvas } = await import("html2canvas");
        const canvas = await html2canvas(chartElement, {
          backgroundColor: "#ffffff",
          scale: 2,
        });
        const imageDataUrl = canvas.toDataURL("image/png");
        onInsertChart(imageDataUrl, dataInput);
        onOpenChange(false);
      } catch (error) {
        console.error("Failed to convert chart to image:", error);
      }
    }
  };

  const getLineStrokeDasharray = () => {
    switch (lineStyle) {
      case "dashed": return "8 4";
      case "dotted": return "2 2";
      default: return undefined;
    }
  };

  const getMarkerShape = (): "circle" | "square" | "triangle" | undefined => {
    switch (markerStyle) {
      case "square": return "square";
      case "triangle": return "triangle";
      case "none": return undefined;
      default: return "circle";
    }
  };

  const renderChart = () => {
    const axisStyle = { fontSize, fill: "#666" };
    
    // Multi-series scatter plot
    if (multipleSeriesMode && chartType === "scatter" && allSeriesData) {
      return (
        <ResponsiveContainer width="100%" height={280}>
          <ComposedChart margin={{ top: 20, right: 30, left: 20, bottom: 40 }}>
            {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />}
            <XAxis
              dataKey="xNumeric"
              type="number"
              tick={axisStyle}
              label={xAxisLabel ? { value: xAxisLabel, position: "bottom", offset: 0, style: { fontSize } } : undefined}
              domain={['auto', 'auto']}
            />
            <YAxis
              tick={axisStyle}
              label={yAxisLabel ? { value: yAxisLabel, angle: -90, position: "insideLeft", style: { fontSize } } : undefined}
            />
            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
            {showLegend && <Legend />}
            {allSeriesData.map((series, index) => {
              const hasYErrors = series.parsedData.some(d => d.errorY !== undefined);
              const hasXErrors = series.parsedData.some(d => d.errorX !== undefined);
              return (
                <Scatter 
                  key={series.id}
                  name={series.name}
                  data={series.parsedData} 
                  fill={series.color}
                  shape={showDataPoints ? getMarkerShape() : undefined}
                >
                  {series.showErrorBars && showYErrorBars && hasYErrors && (
                    <ErrorBar dataKey="errorY" width={4} strokeWidth={1.5} stroke={series.color} direction="y" />
                  )}
                  {series.showErrorBars && showXErrorBars && hasXErrors && (
                    <ErrorBar dataKey="errorX" width={4} strokeWidth={1.5} stroke={series.color} direction="x" />
                  )}
                </Scatter>
              );
            })}
          </ComposedChart>
        </ResponsiveContainer>
      );
    }
    
    // Multi-series line chart
    if (multipleSeriesMode && chartType === "line" && allSeriesData) {
      return (
        <ResponsiveContainer width="100%" height={280}>
          <ComposedChart margin={{ top: 20, right: 30, left: 20, bottom: 40 }}>
            {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />}
            <XAxis
              dataKey="xNumeric"
              type="number"
              tick={axisStyle}
              label={xAxisLabel ? { value: xAxisLabel, position: "bottom", offset: 0, style: { fontSize } } : undefined}
              domain={['auto', 'auto']}
            />
            <YAxis
              tick={axisStyle}
              label={yAxisLabel ? { value: yAxisLabel, angle: -90, position: "insideLeft", style: { fontSize } } : undefined}
            />
            <Tooltip />
            {showLegend && <Legend />}
            {allSeriesData.map((series) => {
              const hasYErrors = series.parsedData.some(d => d.errorY !== undefined);
              return (
                <Line
                  key={series.id}
                  type="monotone"
                  data={series.parsedData}
                  dataKey="value"
                  name={series.name}
                  stroke={series.color}
                  strokeWidth={2}
                  strokeDasharray={getLineStrokeDasharray()}
                  dot={showDataPoints ? { fill: series.color, strokeWidth: 2, r: 4 } : false}
                  activeDot={{ r: 6 }}
                >
                  {series.showErrorBars && showYErrorBars && hasYErrors && (
                    <ErrorBar dataKey="errorY" width={4} strokeWidth={1.5} stroke={series.color} />
                  )}
                </Line>
              );
            })}
          </ComposedChart>
        </ResponsiveContainer>
      );
    }

    // Single series mode
    const hasYErrors = chartData.some(d => d.errorY !== undefined);
    const hasXErrors = chartData.some(d => d.errorX !== undefined);

    // Use ComposedChart for scatter + regression line
    if (chartType === "scatter") {
      return (
        <ResponsiveContainer width="100%" height={280}>
          <ComposedChart margin={{ top: 20, right: 30, left: 20, bottom: 40 }}>
            {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />}
            <XAxis
              dataKey="xNumeric"
              type="number"
              tick={axisStyle}
              label={xAxisLabel ? { value: xAxisLabel, position: "bottom", offset: 0, style: { fontSize } } : undefined}
              domain={['auto', 'auto']}
            />
            <YAxis
              tick={axisStyle}
              label={yAxisLabel ? { value: yAxisLabel, angle: -90, position: "insideLeft", style: { fontSize } } : undefined}
            />
            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
            {showLegend && <Legend />}
            <Scatter 
              name="Data" 
              data={chartData} 
              fill={activeColors[0]}
              shape={showDataPoints ? getMarkerShape() : undefined}
            >
              {showYErrorBars && hasYErrors && (
                <ErrorBar dataKey="errorY" width={4} strokeWidth={1.5} stroke="#333" direction="y" />
              )}
              {showXErrorBars && hasXErrors && (
                <ErrorBar dataKey="errorX" width={4} strokeWidth={1.5} stroke="#333" direction="x" />
              )}
            </Scatter>
            {regressionType !== "none" && regressionLineData && (
              <Line
                type="monotone"
                dataKey="y"
                data={regressionLineData.map(p => ({ xNumeric: p.x, y: p.y }))}
                stroke="#d62728"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={false}
                legendType="none"
                name="Best fit"
                isAnimationActive={false}
              />
            )}
          </ComposedChart>
        </ResponsiveContainer>
      );
    }

    switch (chartType) {
      case "bar":
        return (
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 40 }}>
              {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />}
              <XAxis
                dataKey="name"
                tick={axisStyle}
                label={xAxisLabel ? { value: xAxisLabel, position: "bottom", offset: 0, style: { fontSize } } : undefined}
              />
              <YAxis
                tick={axisStyle}
                label={yAxisLabel ? { value: yAxisLabel, angle: -90, position: "insideLeft", style: { fontSize } } : undefined}
              />
              <Tooltip />
              {showLegend && <Legend />}
              <Bar dataKey="value" fill={activeColors[0]} radius={[4, 4, 0, 0]}>
                {showYErrorBars && hasYErrors && (
                  <ErrorBar dataKey="errorY" width={4} strokeWidth={1.5} stroke="#333" />
                )}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        );
      case "line":
        return (
          <ResponsiveContainer width="100%" height={280}>
            <ComposedChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 40 }}>
              {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />}
              <XAxis
                dataKey="name"
                tick={axisStyle}
                label={xAxisLabel ? { value: xAxisLabel, position: "bottom", offset: 0, style: { fontSize } } : undefined}
              />
              <YAxis
                tick={axisStyle}
                label={yAxisLabel ? { value: yAxisLabel, angle: -90, position: "insideLeft", style: { fontSize } } : undefined}
              />
              <Tooltip />
              {showLegend && <Legend />}
              <Line
                type="monotone"
                dataKey="value"
                stroke={activeColors[0]}
                strokeWidth={2}
                strokeDasharray={getLineStrokeDasharray()}
                dot={showDataPoints ? { fill: activeColors[0], strokeWidth: 2, r: 4 } : false}
                activeDot={{ r: 6 }}
              >
                {showYErrorBars && hasYErrors && (
                  <ErrorBar dataKey="errorY" width={4} strokeWidth={1.5} stroke="#333" />
                )}
              </Line>
            </ComposedChart>
          </ResponsiveContainer>
        );
      case "area":
        return (
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 40 }}>
              {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />}
              <XAxis
                dataKey="name"
                tick={axisStyle}
                label={xAxisLabel ? { value: xAxisLabel, position: "bottom", offset: 0, style: { fontSize } } : undefined}
              />
              <YAxis
                tick={axisStyle}
                label={yAxisLabel ? { value: yAxisLabel, angle: -90, position: "insideLeft", style: { fontSize } } : undefined}
              />
              <Tooltip />
              {showLegend && <Legend />}
              <Area
                type="monotone"
                dataKey="value"
                stroke={activeColors[0]}
                fill={activeColors[0]}
                fillOpacity={0.3}
                strokeDasharray={getLineStrokeDasharray()}
              />
            </AreaChart>
          </ResponsiveContainer>
        );
      case "pie":
        return (
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={true}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={90}
                fill={activeColors[0]}
                dataKey="value"
              >
                {chartData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={activeColors[index % activeColors.length]} />
                ))}
              </Pie>
              <Tooltip />
              {showLegend && <Legend />}
            </PieChart>
          </ResponsiveContainer>
        );
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create Scientific Chart</DialogTitle>
          <DialogDescription>
            Create publication-quality charts with error bars, curve fitting, and customizable styling.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Basic Settings */}
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="chart-type">Chart Type</Label>
              <Select value={chartType} onValueChange={(v) => setChartType(v as ChartType)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="scatter">Scatter Plot</SelectItem>
                  <SelectItem value="line">Line Chart</SelectItem>
                  <SelectItem value="bar">Bar Chart</SelectItem>
                  <SelectItem value="area">Area Chart</SelectItem>
                  <SelectItem value="pie">Pie Chart</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2 col-span-2">
              <Label htmlFor="chart-title">Chart Title</Label>
              <Input
                id="chart-title"
                value={chartTitle}
                onChange={(e) => setChartTitle(e.target.value)}
                placeholder="Enter chart title"
              />
            </div>
          </div>

          {chartType !== "pie" && (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="x-axis">X-Axis Label</Label>
                <Input
                  id="x-axis"
                  value={xAxisLabel}
                  onChange={(e) => setXAxisLabel(e.target.value)}
                  placeholder="e.g., Time (s)"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="y-axis">Y-Axis Label</Label>
                <Input
                  id="y-axis"
                  value={yAxisLabel}
                  onChange={(e) => setYAxisLabel(e.target.value)}
                  placeholder="e.g., Temperature (°C)"
                />
              </div>
            </div>
          )}

          {/* Data Input */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>Data</Label>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Multiple trials</span>
                <Switch checked={multipleSeriesMode} onCheckedChange={setMultipleSeriesMode} />
              </div>
            </div>
            
            {!multipleSeriesMode ? (
              // Single series mode
              <div className="space-y-2">
                <Textarea
                  id="chart-data"
                  value={dataInput}
                  onChange={(e) => handleDataChange(e.target.value)}
                  rows={5}
                  placeholder="x, y, yError, xError (optional)&#10;0, 10.5, 0.5, 0.2&#10;1, 15.2, 0.8, 0.3&#10;2, 22.1, 1.2, 0.4"
                  className="font-mono text-sm"
                />
                <p className="text-xs text-muted-foreground">
                  Format: x, y, y-error (optional), x-error (optional). Use numeric x-values for curve fitting.
                </p>
              </div>
            ) : (
              // Multiple series mode
              <div className="space-y-3">
                {dataSeries.map((series, index) => (
                  <div key={series.id} className="p-3 border rounded-md space-y-2">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-4 h-4 rounded-full border" 
                        style={{ backgroundColor: series.color }}
                      />
                      <Input
                        value={series.name}
                        onChange={(e) => updateSeries(series.id, 'name', e.target.value)}
                        className="h-8 flex-1"
                        placeholder="Trial name"
                      />
                      <Select 
                        value={series.color} 
                        onValueChange={(v) => updateSeries(series.id, 'color', v)}
                      >
                        <SelectTrigger className="w-24 h-8">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: series.color }} />
                            <span className="text-xs">Color</span>
                          </div>
                        </SelectTrigger>
                        <SelectContent>
                          {activeColors.map((color, i) => (
                            <SelectItem key={color} value={color}>
                              <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
                                <span>Color {i + 1}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {dataSeries.length > 1 && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => removeSeries(series.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                    <Textarea
                      value={series.data}
                      onChange={(e) => updateSeries(series.id, 'data', e.target.value)}
                      rows={3}
                      placeholder="x, y, yError, xError&#10;0, 10.5, 0.5&#10;1, 15.2, 0.8"
                      className="font-mono text-xs"
                    />
                  </div>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={addSeries}
                  className="w-full"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Trial
                </Button>
                <p className="text-xs text-muted-foreground">
                  Each trial will be plotted with a different color. Include error columns for error bars.
                </p>
              </div>
            )}
          </div>

          {/* Error Bars & Curve Fitting */}
          {chartType !== "pie" && (
            <div className="grid grid-cols-2 gap-4">
              {/* Error Bars */}
              <div className="space-y-3 p-3 border rounded-md">
                <Label className="font-medium">Error Bars</Label>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Y Error Bars</span>
                  <Switch checked={showYErrorBars} onCheckedChange={setShowYErrorBars} />
                </div>
                {(chartType === "scatter") && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm">X Error Bars</span>
                    <Switch checked={showXErrorBars} onCheckedChange={setShowXErrorBars} />
                  </div>
                )}
              </div>

              {/* Curve Fitting */}
              <div className="space-y-3 p-3 border rounded-md">
                <Label className="font-medium">Curve Fitting</Label>
                <Select value={regressionType} onValueChange={(v) => setRegressionType(v as RegressionType)}>
                  <SelectTrigger>
                    <SelectValue placeholder="None" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    <SelectItem value="linear">Linear (y = mx + b)</SelectItem>
                    <SelectItem value="polynomial">Polynomial (y = ax² + bx + c)</SelectItem>
                    <SelectItem value="power">Power (y = ax^b)</SelectItem>
                    <SelectItem value="exponential">Exponential (y = ae^bx)</SelectItem>
                    <SelectItem value="logarithmic">Logarithmic (y = a·ln(x) + b)</SelectItem>
                  </SelectContent>
                </Select>
                {regressionType === "polynomial" && (
                  <div className="flex items-center gap-2">
                    <span className="text-sm">Degree:</span>
                    <Select value={String(polynomialDegree)} onValueChange={(v) => setPolynomialDegree(parseInt(v))}>
                      <SelectTrigger className="w-20">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2">2</SelectItem>
                        <SelectItem value="3">3</SelectItem>
                        <SelectItem value="4">4</SelectItem>
                        <SelectItem value="5">5</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
                {regressionResult && regressionType !== "none" && (
                  <div className="text-xs bg-muted p-2 rounded space-y-1">
                    <p className="font-mono">{regressionResult.equation}</p>
                    <p>R² = {regressionResult.r2.toFixed(4)}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Display Options (Collapsible) */}
          <Collapsible>
            <CollapsibleTrigger className="flex items-center gap-2 text-sm font-medium hover:text-foreground text-muted-foreground">
              <ChevronDown className="h-4 w-4" />
              Display Options
            </CollapsibleTrigger>
            <CollapsibleContent className="pt-3 space-y-3">
              <div className="grid grid-cols-4 gap-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Grid</span>
                  <Switch checked={showGrid} onCheckedChange={setShowGrid} />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Legend</span>
                  <Switch checked={showLegend} onCheckedChange={setShowLegend} />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Points</span>
                  <Switch checked={showDataPoints} onCheckedChange={setShowDataPoints} />
                </div>
                <div className="space-y-1">
                  <span className="text-sm">Font: {fontSize}px</span>
                  <Input
                    type="range"
                    min="8"
                    max="16"
                    value={fontSize}
                    onChange={(e) => setFontSize(parseInt(e.target.value))}
                    className="w-full h-2"
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-1">
                  <Label className="text-xs">Line Style</Label>
                  <Select value={lineStyle} onValueChange={(v) => setLineStyle(v as any)}>
                    <SelectTrigger className="h-8">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="solid">Solid</SelectItem>
                      <SelectItem value="dashed">Dashed</SelectItem>
                      <SelectItem value="dotted">Dotted</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Marker</Label>
                  <Select value={markerStyle} onValueChange={(v) => setMarkerStyle(v as any)}>
                    <SelectTrigger className="h-8">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="circle">Circle</SelectItem>
                      <SelectItem value="square">Square</SelectItem>
                      <SelectItem value="triangle">Triangle</SelectItem>
                      <SelectItem value="none">None</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Colors</Label>
                  <Select value={colorScheme} onValueChange={(v) => setColorScheme(v as any)}>
                    <SelectTrigger className="h-8">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="default">Default</SelectItem>
                      <SelectItem value="colorblind">Colorblind</SelectItem>
                      <SelectItem value="grayscale">Grayscale</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Preview */}
          <div className="space-y-2">
            <Label>Preview</Label>
            <div
              id="chart-preview"
              className="bg-white p-4 rounded-md border"
              style={{ minHeight: 350 }}
            >
              {chartTitle && (
                <h4 className="text-center font-semibold mb-2 text-foreground text-lg">
                  {chartTitle}
                </h4>
              )}
              {chartData.length > 0 ? (
                renderChart()
              ) : (
                <div className="flex items-center justify-center h-64 text-muted-foreground">
                  Enter valid data to see preview
                </div>
              )}
              {regressionResult && regressionType !== "none" && (
                <p className="text-center text-xs text-muted-foreground mt-2">
                  {regressionResult.equation} (R² = {regressionResult.r2.toFixed(4)})
                </p>
              )}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleInsert} disabled={chartData.length === 0}>
            Insert Chart
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
