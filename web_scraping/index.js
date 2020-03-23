//test for Mmegi
const axios = require('axios');
const cheerio = require('cheerio');
const prompt = require('prompt-sync')();
const fs = require('fs');

//url
// const url = 'http://www.mmegi.bw/index.php?aid=84965&dir=2020/march/21';
const url = prompt('Enter page url: ');
const file_name = prompt('Enter output file name: ');
const writeStream = fs.createWriteStream(file_name);

//axios
axios.get(url)
  .then(response => {

    //function to get data
    let getData = html => {
      //loading html file
      const $ = cheerio.load(html);

      //title
      const title = $('.post_title').text();

      //content
      const content = $('.single_post_content').text().replace(/\s\s/g, '');

      //outputting the data
      writeStream.write(`${title}\n${content}`);
      console.log('Finished writing data');
    }

    //calling the function
    getData(response.data);
  })
  .catch(error => {
    console.log(error);
  })
