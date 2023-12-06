let posts=[
    {id : 1 ,post:"lorem ipsum"},
    {id : 2 ,post:"sit amet consectetur adipisicing"},
    {id : 3 ,post:"Explicabo, atque tenetur ea eum quas"},
    {id : 4 ,post:"quisquam consequatur rerum quam iure magni!"},
]

function listPosts(){
    console.log(posts)
}

function addPost(post){
    const promise = new Promise((resolve,reject) => {
            posts.push(post)
            resolve(post)
            reject("ERROR")
    })
}
listPosts()
let p={id:5,post:"lorem"}
addPost(p)
listPosts()