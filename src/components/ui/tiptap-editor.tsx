import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import Image from '@tiptap/extension-image'
import Dropcursor from '@tiptap/extension-dropcursor'
import Gapcursor from '@tiptap/extension-gapcursor'
import { Extension, Node } from '@tiptap/core'
import Suggestion from '@tiptap/suggestion'
import { ReactRenderer } from '@tiptap/react'
import { Plugin, PluginKey } from 'prosemirror-state'
import { Decoration, DecorationSet } from 'prosemirror-view'
import tippy from 'tippy.js'
import katex from 'katex'
import 'katex/dist/katex.min.css'
import { useEffect, useState, forwardRef, useImperativeHandle, useCallback } from 'react'
import { PencilLine, Sigma, Type, Heading1, Heading2, Heading3, List, ListOrdered, GripVertical, Plus, Trash2, Copy } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface TiptapEditorProps {
  initialContent?: string
  onChange?: (content: string) => void
  placeholder?: string
}

interface CommandItem {
  title: string
  description: string
  icon: any
  command: (props: any) => void
}

const CommandsList = forwardRef((props: any, ref) => {
  const [selectedIndex, setSelectedIndex] = useState(0)

  const selectItem = (index: number) => {
    const item = props.items[index]
    if (item) {
      props.command(item)
    }
  }

  useImperativeHandle(ref, () => ({
    onKeyDown: ({ event }: { event: KeyboardEvent }) => {
      if (event.key === 'ArrowUp') {
        setSelectedIndex((selectedIndex + props.items.length - 1) % props.items.length)
        return true
      }

      if (event.key === 'ArrowDown') {
        setSelectedIndex((selectedIndex + 1) % props.items.length)
        return true
      }

      if (event.key === 'Enter') {
        selectItem(selectedIndex)
        return true
      }

      return false
    },
  }))

  useEffect(() => {
    setSelectedIndex(0)
  }, [props.items])

  return (
    <div className="z-50 bg-popover border rounded-md shadow-md overflow-hidden">
      {props.items.length > 0 ? (
        props.items.map((item: CommandItem, index: number) => (
          <button
            key={index}
            className={`flex items-center gap-2 w-full px-3 py-2 text-sm text-left hover:bg-accent ${
              index === selectedIndex ? 'bg-accent' : ''
            }`}
            onClick={() => selectItem(index)}
          >
            {item.icon && <item.icon size={16} className="text-muted-foreground" />}
            <div className="flex flex-col">
              <span className="font-medium">{item.title}</span>
              <span className="text-xs text-muted-foreground">{item.description}</span>
            </div>
          </button>
        ))
      ) : (
        <div className="px-3 py-2 text-sm text-muted-foreground">No results</div>
      )}
    </div>
  )
})

export function TiptapEditor({ initialContent, onChange, placeholder }: TiptapEditorProps) {
  const [isDrawingOpen, setIsDrawingOpen] = useState(false)
  const [isEquationOpen, setIsEquationOpen] = useState(false)
  const [hoveredBlock, setHoveredBlock] = useState<number | null>(null)
  const [equationLatex, setEquationLatex] = useState('')
  const [equationPreview, setEquationPreview] = useState('')

  // Update equation preview when latex changes
  useEffect(() => {
    if (equationLatex) {
      try {
        const html = katex.renderToString(equationLatex, {
          throwOnError: false,
          displayMode: true,
        })
        setEquationPreview(html)
      } catch (error) {
        setEquationPreview('Invalid LaTeX')
      }
    } else {
      setEquationPreview('')
    }
  }, [equationLatex])

  // Custom Math node for inline and block equations
  const MathNode = Node.create({
    name: 'math',
    group: 'block',
    atom: true,
    
    addAttributes() {
      return {
        latex: {
          default: '',
        },
      }
    },

    parseHTML() {
      return [
        {
          tag: 'div[data-type="math"]',
          getAttrs: (dom) => ({
            latex: (dom as HTMLElement).getAttribute('data-latex'),
          }),
        },
      ]
    },

    renderHTML({ HTMLAttributes }) {
      return [
        'div',
        {
          'data-type': 'math',
          'data-latex': HTMLAttributes.latex,
          class: 'math-node',
        },
      ]
    },

    addNodeView() {
      return ({ node }) => {
        const dom = document.createElement('div')
        dom.setAttribute('data-type', 'math')
        dom.setAttribute('data-latex', node.attrs.latex)
        dom.className = 'math-node'
        dom.style.cssText = 'padding: 1rem; margin: 0.5rem 0; background: #f9fafb; border-radius: 0.375rem; cursor: pointer;'
        
        const content = document.createElement('div')
        
        try {
          katex.render(node.attrs.latex, content, {
            throwOnError: false,
            displayMode: true,
          })
        } catch (error) {
          content.innerHTML = `<span style="color: red;">Invalid LaTeX: ${node.attrs.latex}</span>`
        }
        
        dom.appendChild(content)
        
        return {
          dom,
          update: (updatedNode) => {
            if (updatedNode.type.name !== 'math') return false
            
            try {
              katex.render(updatedNode.attrs.latex, content, {
                throwOnError: false,
                displayMode: true,
              })
            } catch (error) {
              content.innerHTML = `<span style="color: red;">Invalid LaTeX: ${updatedNode.attrs.latex}</span>`
            }
            
            return true
          },
        }
      }
    },

    // @ts-ignore - Tiptap command typing
    addCommands() {
      return {
        insertMath:
          (latex: string) =>
          ({ commands }: any) => {
            return commands.insertContent({
              type: this.name,
              attrs: { latex },
            })
          },
      }
    },
  })

  // Custom drag-and-drop extension
  const DragHandle = Extension.create({
    name: 'dragHandle',

    addProseMirrorPlugins() {
      return [
        new Plugin({
          key: new PluginKey('dragHandle'),
          props: {
            handleDOMEvents: {
              dragstart(view, event) {
                if (!event.dataTransfer) return false

                const pos = view.posAtCoords({ left: event.clientX, top: event.clientY })
                if (!pos) return false

                const node = view.state.doc.nodeAt(pos.pos)
                if (!node) return false

                const dragNode = pos.pos
                event.dataTransfer.effectAllowed = 'move'
                event.dataTransfer.setData('text/html', node.textContent)
                event.dataTransfer.setData('application/x-prosemirror-drag-pos', String(dragNode))

                return false
              },
              drop(view, event) {
                if (!event.dataTransfer) return false

                const dragPos = event.dataTransfer.getData('application/x-prosemirror-drag-pos')
                if (!dragPos) return false

                const eventPos = view.posAtCoords({ left: event.clientX, top: event.clientY })
                if (!eventPos) return false

                const $dragPos = view.state.doc.resolve(parseInt(dragPos))
                const $eventPos = view.state.doc.resolve(eventPos.pos)

                if ($dragPos.parent === $eventPos.parent && $dragPos.pos === $eventPos.pos) {
                  return false
                }

                const tr = view.state.tr
                const dragNode = $dragPos.parent

                tr.delete($dragPos.before(), $dragPos.after())
                tr.insert(eventPos.pos, dragNode)

                view.dispatch(tr)
                event.preventDefault()

                return true
              },
            },
          },
        }),
      ]
    },
  })

  // Custom extension for block selection and hovering
  const BlockSelection = Extension.create({
    name: 'blockSelection',

    addProseMirrorPlugins() {
      return []
    },
  })

  const getSuggestionItems = ({ query }: any): CommandItem[] => {
    const items: CommandItem[] = [
      {
        title: 'Heading 1',
        description: 'Large section heading',
        icon: Heading1,
        command: ({ editor, range }: any) => {
          editor.chain().focus().deleteRange(range).setNode('heading', { level: 1 }).run()
        },
      },
      {
        title: 'Heading 2',
        description: 'Medium section heading',
        icon: Heading2,
        command: ({ editor, range }: any) => {
          editor.chain().focus().deleteRange(range).setNode('heading', { level: 2 }).run()
        },
      },
      {
        title: 'Heading 3',
        description: 'Small section heading',
        icon: Heading3,
        command: ({ editor, range }: any) => {
          editor.chain().focus().deleteRange(range).setNode('heading', { level: 3 }).run()
        },
      },
      {
        title: 'Bullet List',
        description: 'Create a simple bullet list',
        icon: List,
        command: ({ editor, range }: any) => {
          editor.chain().focus().deleteRange(range).toggleBulletList().run()
        },
      },
      {
        title: 'Numbered List',
        description: 'Create a numbered list',
        icon: ListOrdered,
        command: ({ editor, range }: any) => {
          editor.chain().focus().deleteRange(range).toggleOrderedList().run()
        },
      },
      {
        title: 'Drawing',
        description: 'Insert an illustration or diagram',
        icon: PencilLine,
        command: ({ editor, range }: any) => {
          editor.chain().focus().deleteRange(range).run()
          setIsDrawingOpen(true)
        },
      },
      {
        title: 'Equation',
        description: 'Insert a mathematical equation',
        icon: Sigma,
        command: ({ editor, range }: any) => {
          editor.chain().focus().deleteRange(range).run()
          setIsEquationOpen(true)
        },
      },
    ]

    return items.filter(item => 
      item.title.toLowerCase().includes(query.toLowerCase())
    )
  }

  const SlashCommand = Extension.create({
    name: 'slashCommand',

    addProseMirrorPlugins() {
      return [
        Suggestion({
          editor: this.editor,
          char: '/',
          command: ({ editor, range, props }: any) => {
            props.command({ editor, range })
          },
          items: getSuggestionItems,
          render: renderItems,
        }),
      ]
    },
  })

  const renderItems = () => {
    let component: ReactRenderer | null = null
    let popup: any[] | null = null

    return {
      onStart: (props: any) => {
        component = new ReactRenderer(CommandsList, {
          props,
          editor: props.editor,
        })

        if (!props.clientRect) {
          return
        }

        popup = tippy('body', {
          getReferenceClientRect: props.clientRect,
          appendTo: () => document.body,
          content: component.element,
          showOnCreate: true,
          interactive: true,
          trigger: 'manual',
          placement: 'bottom-start',
        })
      },

      onUpdate(props: any) {
        component?.updateProps(props)

        if (!props.clientRect) {
          return
        }

        popup?.[0]?.setProps({
          getReferenceClientRect: props.clientRect,
        })
      },

      onKeyDown(props: any) {
        if (props.event.key === 'Escape') {
          popup?.[0]?.hide()
          return true
        }

        // @ts-ignore
        return component?.ref?.onKeyDown?.(props) || false
      },

      onExit() {
        popup?.[0]?.destroy()
        component?.destroy()
      },
    }
  }

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      MathNode,
      Dropcursor.configure({
        color: '#3b82f6',
        width: 2,
      }),
      Gapcursor,
      DragHandle,
      BlockSelection,
      Placeholder.configure({
        placeholder: placeholder || 'Type / for commands...',
      }),
      SlashCommand,
    ],
    content: initialContent || '',
    onUpdate: ({ editor }) => {
      if (onChange) {
        onChange(editor.getHTML())
      }
    },
    editorProps: {
      attributes: {
        class: 'focus:outline-none',
      },
    },
  })

  // Add drag handles to blocks after editor mounts
  useEffect(() => {
    if (!editor) return

    const addDragHandles = () => {
      const prosemirror = document.querySelector('.ProseMirror')
      if (!prosemirror) return

      const blocks = prosemirror.querySelectorAll(':scope > *')
      
      blocks.forEach((block, index) => {
        // Skip if already has handle
        if (block.querySelector('.drag-handle')) return

        const handle = document.createElement('div')
        handle.className = 'drag-handle'
        handle.innerHTML = '<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><circle cx="4" cy="3" r="1"/><circle cx="4" cy="8" r="1"/><circle cx="4" cy="13" r="1"/><circle cx="10" cy="3" r="1"/><circle cx="10" cy="8" r="1"/><circle cx="10" cy="13" r="1"/></svg>'
        handle.setAttribute('draggable', 'true')
        handle.setAttribute('contenteditable', 'false')
        
        let draggedElement: HTMLElement | null = null
        
        handle.addEventListener('dragstart', (e) => {
          draggedElement = block as HTMLElement
          draggedElement.classList.add('is-dragging')
          e.dataTransfer!.effectAllowed = 'move'
          e.dataTransfer!.setData('text/html', block.innerHTML)
        })
        
        handle.addEventListener('dragend', () => {
          if (draggedElement) {
            draggedElement.classList.remove('is-dragging')
            draggedElement = null
          }
        })

        // Make the block a drop target
        block.addEventListener('dragover', (e) => {
          e.preventDefault()
          const dragEvent = e as DragEvent
          if (dragEvent.dataTransfer) {
            dragEvent.dataTransfer.dropEffect = 'move'
          }
        })

        block.addEventListener('drop', (e) => {
          e.preventDefault()
          e.stopPropagation()
          
          if (!draggedElement || draggedElement === block) return
          
          const allBlocks = Array.from(prosemirror.children)
          const draggedIndex = allBlocks.indexOf(draggedElement)
          const targetIndex = allBlocks.indexOf(block)
          
          if (draggedIndex < targetIndex) {
            block.after(draggedElement)
          } else {
            block.before(draggedElement)
          }
          
          // Trigger editor update
          if (editor) {
            editor.commands.focus()
          }
        })
        
        // Position handle relative to block
        ;(block as HTMLElement).style.position = 'relative'
        block.insertBefore(handle, block.firstChild)
      })
    }

    // Add handles initially and on content changes
    addDragHandles()
    editor.on('update', addDragHandles)
    
    return () => {
      editor.off('update', addDragHandles)
    }
  }, [editor])

  // Listen for drawing insertion
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === 'drawing-saved' && event.data.imageData) {
        if (editor) {
          editor.chain().focus().setImage({ src: event.data.imageData }).run()
        }
        setIsDrawingOpen(false)
      }
    }

    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [editor])

  // Render math equations after content loads
  useEffect(() => {
    if (!editor) return

    const renderMathEquations = () => {
      const prosemirror = document.querySelector('.ProseMirror')
      if (!prosemirror) return

      const mathNodes = prosemirror.querySelectorAll('[data-type="math"]')
      mathNodes.forEach((node) => {
        const latex = node.getAttribute('data-latex')
        if (latex && !node.querySelector('.katex')) {
          const container = document.createElement('div')
          try {
            katex.render(latex, container, {
              throwOnError: false,
              displayMode: true,
            })
            node.innerHTML = ''
            node.appendChild(container)
          } catch (error) {
            console.error('Math render error:', error)
          }
        }
      })
    }

    // Render on load and updates
    setTimeout(renderMathEquations, 100)
    editor.on('update', () => setTimeout(renderMathEquations, 100))
    
  }, [editor])

  return (
    <>
      <style>{`
        .ProseMirror > * {
          position: relative;
          transition: background-color 0.15s ease;
          padding-left: 0;
          margin-left: 0;
        }
        
        .block-wrapper {
          position: relative;
          transition: background-color 0.15s ease;
        }
        
        .block-wrapper:hover {
          background-color: rgba(0, 0, 0, 0.02);
        }
        
        .drag-handle {
          position: absolute;
          left: -40px;
          top: 4px;
          width: 24px;
          height: 24px;
          cursor: grab;
          opacity: 0;
          transition: opacity 0.15s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #888;
        }
        
        .block-wrapper:hover .drag-handle {
          opacity: 0.5;
        }
        
        .drag-handle:hover {
          opacity: 1 !important;
          background-color: rgba(0, 0, 0, 0.05);
          border-radius: 4px;
        }
        
        .drag-handle:active {
          cursor: grabbing;
        }
        
        .ProseMirror .is-dragging {
          opacity: 0.5;
        }
        
        .ProseMirror p.is-editor-empty:first-child::before {
          color: #adb5bd;
          content: attr(data-placeholder);
          float: left;
          height: 0;
          pointer-events: none;
        }
      `}</style>
      
      <div className="border rounded-lg bg-white shadow-sm min-h-[600px] relative">
        <div className="p-6 pl-16">
          <EditorContent 
            editor={editor} 
            className="prose prose-sm max-w-none focus:outline-none 
              [&_.ProseMirror]:min-h-[500px] 
              [&_.ProseMirror]:outline-none"
          />
        </div>
      </div>

      {/* Drawing Dialog */}
      <Dialog open={isDrawingOpen} onOpenChange={setIsDrawingOpen}>
        <DialogContent className="max-w-[95vw] max-h-[95vh] w-full h-full p-0">
          <DialogHeader className="p-4 border-b">
            <DialogTitle>Illustration Editor</DialogTitle>
            <DialogDescription>
              Create drawings and diagrams. Save your illustration to insert it into your draft.
            </DialogDescription>
          </DialogHeader>
          <div className="w-full h-[calc(95vh-100px)] overflow-hidden">
            <iframe 
              src="/drawings/index.html" 
              className="w-full h-full border-0"
              title="Illustration Editor"
              sandbox="allow-scripts allow-same-origin allow-downloads allow-modals"
            />
          </div>
        </DialogContent>
      </Dialog>

      {/* Equation Dialog */}
      <Dialog open={isEquationOpen} onOpenChange={(open) => {
        setIsEquationOpen(open)
        if (!open) {
          setEquationLatex('')
          setEquationPreview('')
        }
      }}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Insert Mathematical Equation</DialogTitle>
            <DialogDescription>
              Enter your equation using LaTeX syntax
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="latex">LaTeX Code</Label>
              <Textarea
                id="latex"
                placeholder="Example: x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}"
                value={equationLatex}
                onChange={(e) => setEquationLatex(e.target.value)}
                className="font-mono text-sm min-h-[100px]"
              />
              <p className="text-xs text-muted-foreground">
                Common examples: x^2, \frac{"{a}{b}"}, \sqrt{"{x}"}, \sum_{"{i=1}"}^{"{n}"}, \int_{"{a}"}^{"{b}"}
              </p>
            </div>
            
            {equationPreview && (
              <div className="space-y-2">
                <Label>Preview</Label>
                <div 
                  className="p-4 border rounded-md bg-white overflow-x-auto"
                  dangerouslySetInnerHTML={{ __html: equationPreview }}
                />
              </div>
            )}
          </div>
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => {
                setIsEquationOpen(false)
                setEquationLatex('')
                setEquationPreview('')
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                if (editor && equationLatex) {
                  // @ts-ignore
                  editor.chain().focus().insertMath(equationLatex).run()
                  setIsEquationOpen(false)
                  setEquationLatex('')
                  setEquationPreview('')
                }
              }}
              disabled={!equationLatex}
            >
              Insert Equation
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
