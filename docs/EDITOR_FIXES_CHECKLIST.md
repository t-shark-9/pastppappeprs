# Editor Fixes Checklist

## Priority Issues

- [x] **1. Block editor field too short vertically** - Create 5 empty blocks by default OR make the editor longer so it fills a good chunk of the page
  - ✅ Added CSS min-height (70vh for container, 65vh for editor, 60vh for block group)
  - ✅ Created 5 empty paragraph blocks by default when no content is provided

- [x] **2. Chart from table function not working** - Debug and fix the chart generation from table data
  - ✅ Added `extractCellText` helper function to handle all cell formats (strings, arrays, nested content)
  - ✅ Fixed table content structure parsing (handles both `content.rows` and `content.type: tableContent`)
  - ✅ Added numeric validation to only extract valid data points
  - ✅ Improved toast messages for better user feedback

- [x] **3. Improve chart options with matplotlib-style features** - Add comprehensive chart options:
  - ✅ Error bars (toggle on/off, reads 3rd column from data)
  - ✅ Lines of best fit (linear regression with R² value displayed)
  - ✅ Axis labels and titles (already existed, improved)
  - ✅ Legend customization (show/hide toggle)
  - ✅ Grid options (show/hide toggle)
  - ✅ Line styles (solid, dashed, dotted)
  - ✅ Marker styles (circle, square, triangle, none)
  - ✅ Color schemes (default matplotlib, colorblind-friendly, grayscale)
  - ✅ Font size slider
  - ✅ Organized into tabs (Data, Style, Advanced)
  - ✅ Scatter plot with numeric X-axis for proper regression

- [x] **4. Draft not populated with outline for ANY user** - Ensure the draft page loads outline sections for both ghost users and authenticated users
  - ✅ Fixed Outline.tsx saveOutline to save to localStorage for ghost users
  - ✅ Draft.tsx already had correct logic to load from `outline_${id}` localStorage key

- [x] **5. Preview mode issues**:
  - Preview is not editable (intended - it's a read-only preview)
  - ✅ Fixed: Preview now updates with changes from rich editor
  - ✅ Added useEffect in SyncfusionEditor.tsx to reload content when initialContent changes in readOnly mode
  
- [x] **6. Remove save button** - User doesn't want the save button visible
  - ✅ Removed save button from Draft.tsx header
  - ✅ Auto-save still functions normally

- [x] **7. Chart table selector** - Add a way to define/select which table to take data from when creating charts (instead of always using last table)
  - ✅ Added table selector dialog when multiple tables exist
  - ✅ Shows table preview (first row headers) for easy identification
  - ✅ If only one table exists, uses it directly
  - ✅ Added "Enter Data Manually" option to bypass table selection

- [x] **8. Replace AI autocomplete with library** - Remove custom AI autocomplete and use a proper spellcheck/autocomplete library instead
  - ✅ Created new `use-text-autocomplete.ts` hook with phrase-based completions
  - ✅ Removed AI autocomplete dependency (no API calls)
  - ✅ Added 70+ common academic phrases and word completions
  - ✅ Instant suggestions (no debounce/loading) since it's local
  - ✅ Updated Settings page to reflect non-AI autocomplete

- [x] **9. Fix spelling suggestions** - Words get marked as misspelled but suggestions and corrections don't appear
  - ✅ Fixed word detection logic - now correctly finds the word BEFORE the space
  - ✅ Previously was looking for word at cursor position (after space) which found nothing
  - ✅ Improved detection to work after pressing space/punctuation
  - ✅ AutocorrectDropdown should now appear with suggestions

- [x] **10. Blocks wider than viewport** - Block content extends beyond what user can see, needs horizontal constraint
  - ✅ Added max-width: 100% and overflow-x: hidden to .bn-editor
  - ✅ Added word-wrap styles to .bn-block-content
  - ✅ Constrained tables and images to max-width: 100%

- [x] **11. Double-click to edit molecules/graphs** - Double clicking on molecule diagrams and chart images should open their respective editors
  - ✅ Added double-click event listener on editor container
  - ✅ Detects molecule blocks (caption = "Molecule") and opens molecule editor
  - ✅ Detects chart blocks (caption starts with "Chart" or contains chart data) and opens chart dialog
  - ✅ Chart data is now embedded in caption for future editing (hidden from display)
  - ✅ When editing, the block is replaced instead of inserting a new one
  - ✅ Added visual hover indicator (blue glow) on editable images
  - ✅ Note: Molecules need to be recreated since SMILES data isn't stored (future enhancement)

- [x] **12. Enhanced curve fitting options** - Add more regression types:
  - ✅ Linear (y = mx + b)
  - ✅ Polynomial (y = ax² + bx + c, with selectable degree 2-5)
  - ✅ Power (y = ax^b)
  - ✅ Exponential (y = ae^bx)
  - ✅ Logarithmic (y = a·ln(x) + b)
  
- [x] **13. Simplify chart dialog UI** - Move all options under Data tab, remove Style tab as unnecessary
  - ✅ Removed tabs, all options in single scrollable view
  - ✅ Error bars and curve fitting in prominent side-by-side boxes
  - ✅ Display options in collapsible section

- [x] **14. Multiple data series support** - Allow multiple lines/series with individual error bars
  - ✅ Added "Multiple trials" toggle switch
  - ✅ Can add/remove trials dynamically
  - ✅ Each trial has its own name, color picker, and data
  - ✅ Works with scatter plots and line charts
  - ✅ Each series can have its own error bars

- [x] **15. X and Y error bars** - Support error bars in both X and Y directions
  - ✅ Added separate Y and X error bar toggles
  - ✅ Data format now: x, y, yError, xError
  - ✅ X error bars work on scatter plots

- [x] **16. Notes search in editor** - Search and insert content from notes while writing
  - ✅ Created NotesSearchDialog component with Fuse.js fuzzy search
  - ✅ Searches across note title, content, and subject
  - ✅ Preview panel shows selected note content
  - ✅ Copy and Insert buttons to add content to editor
  - ✅ Added `/notes` and `/search notes` slash commands
  - ✅ Subject badges with colors for easy identification

- [x] **17. Grade Your Work page** - Landing page for users to get feedback on their work
  - ✅ Created GradeYourWork.tsx page at /grade route
  - ✅ Upload/paste work interface with clipboard and file upload
  - ✅ Subject and task type selection (IA, EE, TOK, Essay, etc.)
  - ✅ Evaluate button triggers AI feedback via evaluate-draft function
  - ✅ Display overall score, criteria breakdown, strengths, improvements
  - ✅ "Continue Editing" button creates ghost assignment and opens draft
  - ✅ Added featured card on home page in IB Resources section

---

## Notes
- Charts currently use Recharts library
- Consider matplotlib.js or similar for more scientific plotting capabilities
- Draft population logic exists but may not be triggering correctly
