import React from 'react';

const BlogSide = props => {
    const blogList = props.data.map(blogItem => {
        return (
            <div key={blogItem._id} className='blogSideWrapper'>
                <h3>{blogItem.title}</h3>
                <p>{blogItem.desc}</p>
                <div className='editButton'>
                    <button className='btn' onClick={() => props.handleEditClick(blogItem)}>Edit</button>
                </div>
                <div className='deleteButton'>
                    <button className='btn' onClick={() => props.handleDeleteClick(blogItem)}>Delete</button>
                </div>
            </div>
        )
    })

    return <div>{blogList}</div>
}

export default BlogSide;