/* eslint-disable */

const puppeteer = require('puppeteer');

(async () => {
	const URL = 'https://mail.protonmail.com/login';
	const browser = await puppeteer.launch({headless: false, args: ['--no-sandbox']});
	const page = await browser.newPage();
    await page.goto(URL, {waitUntil: 'domcontentloaded'});
    await page.waitForSelector('#username', {visible:true});
    await page.type('#username','lucioherman434');
    await page.waitFor(3000)
    await page.type('#password','lGZOik8DdRYTd8F');
    await page.waitFor(3000)
    await page.click('#login_btn')

    await page.waitForSelector('.sidebar');

    // await page.waitFor(3000)


    // https://mail.protonmail.com/api/messages?AutoWildcard=1&Keyword=craiglist.com&Limit=100&Page=0


        // const emailList = await page.evaluate(()=>document.querySelector('.bodyDecrypted').innerHTML)
    // console.log(emailList)

const getEmailBody = async (conversationId) => {
        try {
            await page.goto(`https://mail.protonmail.com/inbox/${conversationId}`,{waitUntil:['domcontentloaded', 'networkidle0']})
            await page.waitFor(3000)
            const bodyContent = await page.evaluate(()=>document.querySelector('.bodyDecrypted').innerHTML)
            return bodyContent;

        } catch (e) {
           throw new Error("Page doesn't exist")
        }
}

const getEmailInbox = async () => {
    await page.goto('https://mail.protonmail.com/inbox',{
        waitUntil:'domcontentloaded'
    })
    //  ID of the wrapper for conversations list

    const conversations = await page.waitForResponse('https://mail.protonmail.com/api/conversations?LabelID=0&Limit=100&Page=0');


    console.log(await conversations.json())

    // await page.waitForSelector('#conversation-list-columns .conversation');

    // await page.waitFor(5000)

    // const emails = await page.evaluate(()=>{
    //     const conversationList = document.querySelectorAll('#conversation-list-columns .conversation')
    //     const emailList = Array.from(conversationList).map(item => {
    //         const subject = item.querySelector('.conversation-meta .subject').textContent.trim();
    //         const time = item.querySelector('.conversation-meta .time').textContent.trim();
    //         const sender = item.querySelector('.conversation-meta .senders-name').getAttribute('title').trim();
    //         return {subject, time, sender};
    //     })

    //     return emailList;
    // })
    // console.log(emails)

    // const email

}

const getEmailFrom = async (searchTerm) => {
    await page.goto(`https://mail.protonmail.com/search?keyword=${searchTerm}`);
    const messagesResponse = await page.waitForResponse(`https://mail.protonmail.com/api/messages?AutoWildcard=1&Keyword=${searchTerm}&Limit=100&Page=0`)

    const {Messages:messages} = await messagesResponse.json();
    return messages;
}

const messagesList = await getEmailFrom('robot@craigslist.org');

console.log(messagesList)

const firstEmailBody = await getEmailBody(messagesList[0].ConversationID)
console.log(firstEmailBody);

// await getEmailInbox()


    // // Get single email

    // await page.waitFor(5000)

    // await page.waitForSelector('.bodyDecrypted');




    // console.log(text)

})();
