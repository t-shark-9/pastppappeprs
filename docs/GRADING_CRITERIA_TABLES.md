# IB Grading Criteria Tables

This system provides beautiful, responsive CSS-styled tables for displaying IB Internal Assessment grading criteria across all subjects.

## 📁 File Structure

```
src/
├── data/
│   └── iaCriteriaData.ts          # Structured criteria data for all subjects
├── components/
│   ├── GradingCriteriaTable.tsx   # Individual criterion table component
│   ├── GradingCriteriaTable.css   # Beautiful CSS styling
│   └── SubjectCriteriaDisplay.tsx # Complete subject criteria display
```

## 🎯 Features

- **Color-coded mark levels**: Visual distinction between 0, 1-2, 3-4, and 5-6 marks
- **Responsive design**: Tables adapt beautifully to mobile and desktop
- **Dark mode support**: Proper color adjustments for dark theme
- **Print-friendly**: Optimized for PDF generation
- **Clarifications sections**: Expandable info boxes for detailed guidance
- **Subject-specific info**: Custom information cards for Economics portfolios and Business research projects

## 📊 Available Subjects

### Sciences (4 Criteria - 24 marks total)
- **Biology** (2025 Guide)
- **Chemistry** (2025 Guide)
- **Physics** (2025 Guide)

All sciences share the same 4-criteria structure:
1. Research Design (6 marks, 25%)
2. Data Analysis (6 marks, 25%)
3. Conclusion (6 marks, 25%)
4. Evaluation (6 marks, 25%)

### Business Management (7 Criteria - 25 marks total)
Business Management Guide 2024:
1. Integration of a Key Concept (5 marks, 20%)
2. Supporting Documents (4 marks, 16%)
3. Selection and Application of Tools and Theories (4 marks, 16%)
4. Analysis and Evaluation (5 marks, 20%)
5. Conclusions (3 marks, 12%)
6. Structure (2 marks, 8%)
7. Presentation (2 marks, 8%)

### Economics (6 Criteria - 45 marks total)
Economics Guide 2022 - Portfolio of 3 commentaries:

**Per Commentary (14 marks each):**
1. Diagrams (3 marks, 21%)
2. Terminology (2 marks, 14%)
3. Application and Analysis (3 marks, 21%)
4. Key Concept (3 marks, 21%)
5. Evaluation (3 marks, 21%)

**Entire Portfolio:**
6. Rubric Requirements (3 marks, 2%)

## 🚀 Usage Examples

### Example 1: Display Single Criterion

```tsx
import GradingCriteriaTable from "@/components/GradingCriteriaTable";
import iaCriteriaData from "@/data/iaCriteriaData";

const BiologyResearchDesign = () => {
  const criterion = iaCriteriaData.biology.criteria[0]; // Research Design

  return (
    <div>
      <h2>Biology Research Design Criterion</h2>
      <GradingCriteriaTable criterion={criterion} />
    </div>
  );
};
```

### Example 2: Display All Criteria for a Subject

```tsx
import SubjectCriteriaDisplay from "@/components/SubjectCriteriaDisplay";

const BiologyCriteriaPage = () => {
  return (
    <div className="container mx-auto p-6">
      <SubjectCriteriaDisplay subject="biology" />
    </div>
  );
};
```

### Example 3: Custom Implementation

```tsx
import iaCriteriaData from "@/data/iaCriteriaData";
import GradingCriteriaTable from "@/components/GradingCriteriaTable";

const ChemistryIAGuide = () => {
  const chemCriteria = iaCriteriaData.chemistry;

  return (
    <div className="space-y-6">
      <h1>{chemCriteria.subject} IA Assessment</h1>
      <p>Total Marks: {chemCriteria.totalMarks}</p>
      
      {chemCriteria.criteria.map((criterion, index) => (
        <GradingCriteriaTable key={index} criterion={criterion} />
      ))}
    </div>
  );
};
```

## 📝 Data Structure

```typescript
interface CriterionLevel {
  marks: string;           // "0", "1-2", "3-4", "5-6"
  descriptor: string;      // Description of achievement level
  clarifications?: string[];
}

interface AssessmentCriterion {
  name: string;            // "Research Design", "Analysis and Evaluation", etc.
  maxMarks: number;        // 2, 3, 4, 5, or 6
  weighting: number;       // Percentage (8, 12, 16, 20, 21, 25)
  levels: CriterionLevel[];
  clarifications?: string; // Additional guidance
}

interface SubjectCriteria {
  subject: string;
  totalMarks: number;
  guideReference: string;
  yearPublished: string;
  criteria: AssessmentCriterion[];
}
```

## 🎨 CSS Classes Reference

### Table Classes
- `.grading-criteria-table` - Main table styling
- `.grading-criteria-table-wrapper` - Scrollable wrapper
- `.marks-column` - Left column for marks (120px width)
- `.descriptor-column` - Right column for descriptors

### Row Classes
- `.level-0` - Red tint for 0 marks (destructive)
- `.level-1_2` - Yellow tint for 1-2 marks (warning)
- `.level-3_4` - Blue tint for 3-4 marks (primary)
- `.level-5_6` - Green tint for 5-6 marks (success)

### Content Classes
- `.marks-badge` - Colorful badge for marks display
- `.descriptor-content` - Container for descriptor text
- `.bullet-point` - Bullet-pointed items with custom styling
- `.clarifications-section` - Info box for clarifications

## 🔧 Customization

### Changing Colors

Edit `GradingCriteriaTable.css`:

```css
/* Custom success color */
:root {
  --success: 142 76% 36%;  /* Green for 5-6 marks */
  --warning: 38 92% 50%;   /* Yellow for 1-2 marks */
}
```

### Adding Interactive Features

Extend `GradingCriteriaTable.tsx` with expandable sections:

```tsx
const [showClarifications, setShowClarifications] = useState(true);

// Add toggle button to clarifications section
<button onClick={() => setShowClarifications(!showClarifications)}>
  {showClarifications ? "Hide" : "Show"} Details
</button>
```

## 📱 Responsive Behavior

- **Desktop (>768px)**: Full table layout with side-by-side columns
- **Mobile (<768px)**: Reduced padding, smaller font sizes
- **Print**: Border adjustments, page break avoidance

## 🌙 Dark Mode

Automatically adjusts using CSS variables:
- Background colors become more transparent
- Border colors adjust to `--border`
- Text colors use `--foreground` and `--muted-foreground`

## 📂 Adding New Subjects

1. Extract criteria from IB guide text file:
```bash
grep -n "Internal assessment" subject_guide.txt
sed -n 'START_LINE,END_LINEp' subject_guide.txt
```

2. Add to `iaCriteriaData.ts`:
```typescript
export const iaCriteriaData = {
  // ... existing subjects
  
  yourSubject: {
    subject: "Your Subject",
    totalMarks: 24,
    guideReference: "Subject Guide 2024",
    yearPublished: "2024",
    criteria: [
      {
        name: "Criterion Name",
        maxMarks: 6,
        weighting: 25,
        levels: [
          { marks: "0", descriptor: "..." },
          // ... more levels
        ]
      }
    ]
  }
};
```

3. Update TypeScript types if needed in `SubjectCriteriaDisplay.tsx`:
```typescript
subject: "biology" | "chemistry" | "physics" | "businessManagement" | "economics" | "yourSubject"
```

## 🎯 Best Practices

1. **Always include all mark levels**: Even if just "0", include it for completeness
2. **Use clarifications**: Add detailed explanations to help students understand requirements
3. **Keep descriptors concise**: Use bullet points for multi-part requirements
4. **Test responsiveness**: Check tables on mobile devices
5. **Maintain consistency**: Follow the same structure across all subjects

## 🔮 Future Enhancements

- [ ] Extract History criteria (Historical Investigation)
- [ ] Extract Geography criteria (Fieldwork)
- [ ] Extract Psychology criteria (Experimental design)
- [ ] Extract Language A/B criteria
- [ ] Extract Visual Arts criteria
- [ ] Add filtering by mark level
- [ ] Add comparison view (side-by-side criteria)
- [ ] Add downloadable PDF rubrics
- [ ] Add student self-assessment checklist
- [ ] Add teacher moderation tools

## 📚 References

- [IB Biology Guide 2025](public/guides/biology.txt)
- [IB Chemistry Guide 2025](public/guides/chemistry.txt)
- [IB Physics Guide 2025](public/guides/physics.txt)
- [IB Business Management Guide 2024](public/guides/business_management.txt)
- [IB Economics Guide 2022](public/guides/economics.txt)

## 🤝 Contributing

To add criteria for a new subject:

1. Locate the IB guide PDF in `Grading criteria/DATA/`
2. Convert to text: `pdftotext "Guide.pdf" "Guide.txt"`
3. Extract IA section with grep/sed
4. Add structured data to `iaCriteriaData.ts`
5. Test display with `SubjectCriteriaDisplay`
6. Update this README

---

**Last Updated**: December 2024  
**Maintained by**: TooEssay Development Team
