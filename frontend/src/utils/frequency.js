const wordsFrequency = require('words-frequency');


export function calculateFrequencies(posts, maxPosts)
{


    var wordList = " "; // concatenated string of all post titles


    posts.slice(0, maxPosts).map((post, index) => (wordList = wordList.concat(" ",post.title)))
    

    if(wordList !== null && wordList !== " "){

        const product = wordsFrequency(wordList);
        const output = [];

        
        for (const key in product.data) {

            let newWord = {text: key, value: product.data[key]};
            output.push(newWord);
        }

        return output;
     }


     return 0; //error case
}
