import React from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { TextProps } from '../../interface/TextProps';


const TextEditor = (props: TextProps) => {
    const { placeholder, value, onChange } = props;
    return (
      <ReactQuill
        className='h-[27rem]'
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
              ['link'],
              ['clean']
          ],
        }}
      />
    )
}

export default TextEditor