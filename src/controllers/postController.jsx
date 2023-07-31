

 export async function getPosts() {
    const res = await fetch('api/posts')
    const json = await res.json()
    return json

}

export async function getPost(id){
    const res = await fetch('/api/posts/'+id)
    const post = await res.json()
    return post
}

export async function createPost(formData){
  
    const res = await fetch('api/posts', {
        method: 'POST',
        headers: {
          'Authorization':'Bearer '+ formData.get('token')
        },
        body: formData
        
        // JSON.stringify({
        //   email: user.email,
        //   title: formData.get('title'), 
        //   body: formData.get('body'),
        //   category: formData.get('category'),
        //   tags: formData.get('tags')
        // })
        
        //JSON.stringify
        // ({email:user.email, title:post.title, body:post.body, category:post.category, tags: post.tags})
      })
  
     return res
     
}

export async function updatePost(id, post){
    const res = await fetch('/api/posts/'+id, {
        method: 'PUT',
        headers: {
          'Content-Type':'application/json'
        }, 
        body: JSON.stringify({title:post.title, body:post.body, category:post.category, tags: post.tags})
      })

      return res

}

export async function deletePost(id){
    const res = await fetch('/api/posts/'+id, {
        method: 'DELETE'
      })

      const json = await res.json()
      return json
}

export async function searchPosts(searchTerm) {
  const res = await fetch('/api/posts/search', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({searchTerm: searchTerm})
  })

  return res
}

