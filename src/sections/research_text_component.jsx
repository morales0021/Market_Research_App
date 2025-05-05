import React from 'react';

function ResearchTextComponent({title, text_content}){

  const formattedText = text_content
  .replace(/<important>/g, '<strong>')
  .replace(/<\/important>/g, '</strong>');

  return (
  <div className="box has-background-success-light has-text-dark is-size-7 has-text-justified" style={{
                    borderRadius: '4px', // less rounded corners (default is 6px in Bulma)
                    border: '1px solid #ccc' // visible border (light gray)
                    }}>
    <h1 className="is-size-6">{title}</h1>
    <hr className="my-1"></hr>

    {formattedText.split('\n').map((paragraph, index) => (
      <p
        key={index}
        className="mb-4"
        dangerouslySetInnerHTML={{ __html: paragraph }}
      />
  ))}
    </div>
  )
}

export default ResearchTextComponent;