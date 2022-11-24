import React from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';

interface TextProps {
    value: string;
}

const TextViewer = (prop: TextProps) => {
    const { value } = prop;
    
    return (
        <ReactQuill
        className='h-full'
        theme="bubble"
        value={value}
        readOnly={true}
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

export default TextViewer