import { forwardRef, useEffect, useImperativeHandle, useRef, type CSSProperties } from 'react';
import Quill from 'quill';
import MarkdownIt from 'markdown-it';
import { ResizableTable } from 'quill-resizable-table';
import { useTheme } from 'styled-components';
import 'quill/dist/quill.snow.css';
import 'quill-resizable-table/dist/quill-resizable-table.css';
import './quill-rich-text.css';

type QuillRichTextInputProps = {
  attribute: { type: string };
  disabled?: boolean;
  hint?: string;
  intlLabel?: { defaultMessage?: string };
  name: string;
  onChange: (event: { target: { name: string; type: string; value: string } }) => void;
  placeholder?: { defaultMessage: string };
  required?: boolean;
  value?: string | null;
};

const markdown = new MarkdownIt({ breaks: true, linkify: true });
let isTableModuleRegistered = false;

function isHtml(value: string) {
  return /<[^>]+>/.test(value);
}

function registerTableModule() {
  if (isTableModuleRegistered) return;

  const icons = Quill.import('ui/icons') as Record<string, string>;
  icons.table = ResizableTable.TABLE_ICON;
  Quill.register('modules/resizableTable', ResizableTable, true);
  isTableModuleRegistered = true;
}

const QuillRichTextInput = forwardRef<HTMLDivElement, QuillRichTextInputProps>(({
  attribute,
  disabled = false,
  hint,
  intlLabel,
  name,
  onChange,
  placeholder,
  required = false,
  value,
}, forwardedRef) => {
  const theme = useTheme();
  const editorElementRef = useRef<HTMLDivElement>(null);
  const quillRef = useRef<Quill | null>(null);
  const onChangeRef = useRef(onChange);
  const valueRef = useRef(value ?? '');
  const fieldLabel = intlLabel?.defaultMessage ?? 'Content';
  const themeVariables = {
    '--quill-surface': theme.colors.neutral0,
    '--quill-text': theme.colors.neutral800,
    '--quill-muted-text': theme.colors.neutral600,
    '--quill-border': theme.colors.neutral200,
    '--quill-active': theme.colors.primary600,
  } as CSSProperties;

  useImperativeHandle(forwardedRef, () => editorElementRef.current as HTMLDivElement);

  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  useEffect(() => {
    const nextValue = value ?? '';
    const quill = quillRef.current;

    if (!quill) {
      valueRef.current = nextValue;
      return;
    }

    // Changes emitted by this editor come back through Strapi as `value`.
    // Pasting them again resets Quill's selection to the beginning, making
    // Enter appear to add lines above the cursor.
    if (nextValue === valueRef.current || quill.root.innerHTML === nextValue) return;

    valueRef.current = nextValue;
    quill.clipboard.dangerouslyPasteHTML(isHtml(nextValue) ? nextValue : markdown.render(nextValue), 'silent');
  }, [value]);

  useEffect(() => {
    if (!editorElementRef.current) return;

    registerTableModule();
    const quill = new Quill(editorElementRef.current, {
      theme: 'snow',
      placeholder: placeholder?.defaultMessage ?? 'Write your content…',
      readOnly: disabled,
      modules: {
        toolbar: [
          [{ header: [1, 2, 3, 4, false] }],
          ['bold', 'italic', 'underline', 'strike'],
          [{ color: [] }, { background: [] }],
          [{ align: [] }],
          [{ list: 'ordered' }, { list: 'bullet' }],
          [{ indent: '-1' }, { indent: '+1' }],
          ['blockquote', 'code-block', 'link', 'image', 'video'],
          ['table', 'clean'],
        ],
        resizableTable: {
          minColumnWidth: 60,
          minRowHeight: 28,
        },
      },
    });

    const initialValue = valueRef.current;
    if (initialValue) {
      quill.clipboard.dangerouslyPasteHTML(isHtml(initialValue) ? initialValue : markdown.render(initialValue), 'silent');
    }

    const handleTextChange = () => {
      const html = quill.getSemanticHTML();
      valueRef.current = html;
      onChangeRef.current({ target: { name, type: attribute.type, value: html } });
    };

    quill.on('text-change', handleTextChange);
    quillRef.current = quill;

    return () => {
      quill.off('text-change', handleTextChange);
      (quill.getModule('resizableTable') as ResizableTable | undefined)?.destroy();
      quillRef.current = null;
      editorElementRef.current?.replaceChildren();
    };
  }, []);

  return (
    <div className="quill-rich-text-field" style={themeVariables}>
      <label className="quill-rich-text-field__label" htmlFor={name}>
        {fieldLabel}{required ? ' *' : ''}
      </label>
      <div
        aria-describedby={hint ? `${name}-hint` : undefined}
        aria-label={fieldLabel}
        className="quill-rich-text-field__editor"
        id={name}
        ref={editorElementRef}
      />
      {hint ? <p className="quill-rich-text-field__hint" id={`${name}-hint`}>{hint}</p> : null}
    </div>
  );
});

export default QuillRichTextInput;
