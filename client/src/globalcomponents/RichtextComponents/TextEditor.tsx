import React from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface TextProps {
    placeholder: string;
    value: string;
    onChange: (value: string) => void;
}

const TextEditor = (props: TextProps) => {
    const { placeholder, value, onChange } = props;
    return (
      <ReactQuill
        className='h-64'
        theme="snow"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        modules={{
          toolbar: [
              [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
              ['bold', 'italic', 'underline', 'strike', 'blockquote'],
              [{ 'list': 'ordered' }, { 'list': 'bullet' }],
              [{ 'indent': '-1' }, { 'indent': '+1' }],
              [{ 'align': [] }],
              ['link', 'image'],
              ['clean']
          ],
        }}
      />
    )
}

export default TextEditor