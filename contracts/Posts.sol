// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.7.0;


contract Posts {
    struct Post {
        string title;
        string content;
        string markdown;
        address owner;
    }
    Post[] public m_post;
    
    function addPost(
        string calldata title, 
        string calldata content, 
        string calldata markdown
    ) external {
        Post memory new_post = Post({
            title: title,
            content: content,
            markdown: markdown,
            owner: msg.sender
        });
        m_post.push(new_post);
    }
    function getPost(uint256 index) external returns (
        string memory,
        string memory,
        string memory,
        address
    ) {
        Post memory tmp_post =  m_post[index];
        return (
            tmp_post.title,
            tmp_post.content,
            tmp_post.markdown,
            tmp_post.owner
        );
    }
}