'use client'
import { useState } from 'react';
import Editor from '@monaco-editor/react';

interface CodeEditorProps {
  initialCode: string;
  language?: string;
}

export default function CodeEditor({ initialCode, language = 'javascript' }: CodeEditorProps) {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState('');

  const handleRunCode = () => {
    try {
      // 創建一個安全的執行環境
      const safeEval = new Function(`
        let output = '';
        const console = {
          log: (...args) => {
            output += args.join(' ') + '\\n';
          }
        };
        ${code}
        return output;
      `);
      
      const result = safeEval();
      setOutput(result);
    } catch (error) {
      setOutput(`錯誤: ${error instanceof Error ? error.message : '未知錯誤'}`);
    }
  };

  const isError = output.startsWith('錯誤');

  return (
    <div className="bg-gradient-to-br from-blue-50 to-white border border-gray-200 rounded-xl overflow-hidden shadow-xl my-6">
      <div className="bg-gradient-to-r from-blue-100 to-blue-200 p-3 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16.88 3.549A9 9 0 1021 12.001M19.07 4.93A9 9 0 0112 21a9 9 0 01-7.07-16.07" /></svg>
          <h3 className="text-lg font-bold text-blue-700 select-none">程式碼編輯器</h3>
        </div>
        <button
          onClick={handleRunCode}
          className="px-4 py-1.5 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 active:scale-95 transition-all flex items-center gap-1 font-semibold"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 3v18l15-9L5 3z" /></svg>
          執行
        </button>
      </div>
      <div className="editor-section">
        <Editor
          height="180px"
          defaultLanguage={language}
          defaultValue={code}
          onChange={(value) => setCode(value || '')}
          theme="vs-dark"
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            scrollBeyondLastLine: false,
            automaticLayout: true,
            scrollbar: { vertical: 'hidden', horizontal: 'hidden' },
            wordWrap: 'on',
            lineNumbers: 'on',
            overviewRulerLanes: 0,
            renderLineHighlight: 'none',
            renderIndentGuides: false,
            folding: true,
            lineDecorationsWidth: 2,
            lineNumbersMinChars: 4,
          }}
        />
      </div>
      <div className={`p-4 border-t ${isError ? 'bg-red-50' : output ? 'bg-green-50' : 'bg-gray-50'} transition-colors`}>
        <div className="flex items-center gap-2 mb-2">
          {output ? (
            isError ? (
              <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
            ) : (
              <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
            )
          ) : null}
          <h3 className={`text-sm font-medium ${isError ? 'text-red-700' : output ? 'text-green-700' : 'text-gray-700'}`}>執行結果：</h3>
        </div>
        <pre className="bg-white p-3 rounded border border-gray-200 text-sm overflow-x-auto whitespace-pre-wrap min-h-[24px]">{output}</pre>
      </div>
    </div>
  );
} 