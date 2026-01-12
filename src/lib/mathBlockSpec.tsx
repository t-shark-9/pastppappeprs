import { createReactBlockSpec, createReactInlineContentSpec } from "@blocknote/react";
import { MathBlock, InlineMathComponent } from "@/components/editors/MathBlock";

export const inlineMathBlockSpec = createReactBlockSpec(
  {
    type: "inlineMath",
    propSchema: {
      latex: {
        default: "",
      },
      mode: {
        default: "inline",
      },
      collapsed: {
        default: false,
      },
    },
    content: "none",
  },
  {
    render: (props: any) => {
      return <MathBlock block={props.block} editor={props.editor} />;
    },
  }
);

export const blockMathBlockSpec = createReactBlockSpec(
  {
    type: "blockMath",
    propSchema: {
      latex: {
        default: "",
      },
      mode: {
        default: "block",
      },
      collapsed: {
        default: false,
      },
    },
    content: "none",
  },
  {
    render: (props: any) => {
      return <MathBlock block={props.block} editor={props.editor} />;
    },
  }
);

// True inline math that can be used within paragraphs
export const inlineMathInlineSpec = createReactInlineContentSpec(
  {
    type: "inlineMathInline",
    propSchema: {
      latex: {
        default: "",
      },
    },
    content: "none",
  },
  {
    render: (props: any) => {
      return <InlineMathComponent {...props} />;
    },
  }
);
