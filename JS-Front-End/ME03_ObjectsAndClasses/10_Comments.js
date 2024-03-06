function comments(input){
    let users = [];
    let articles = [];
    let comments = [];

    for (const command of input) {
        if(command.includes('user ')){
            users.push(command.split('user ')[1]);
        }
        else if(command.includes('article ')){
            let articleName = command.split('article ')[1];
            articles.push({ name: articleName, count: 1});
        }
        else if(command.includes(' posts on ')){
            let [username, split] = command.split(' posts on ');
            if(!users.find((u) => u === username)){
                continue;
            }
            let articleName = split.split(': ')[0];
            let article = articles.find((a) => a.name === articleName);
            if(!article){
                continue;
            }
            let [commentTitle, commentContent] = split.split(': ')[1].split(', ');
            article.count = article.count + 1;
            comments.push({ title: commentTitle, content: commentContent, article: article, user: username });
        }
    }

    articles.sort((a,b) => b.count - a.count);
    comments.sort((a,b) => a.user.localeCompare(b.user));

    for (const article of articles) {
        console.log(`Comments on ${article.name}`);
        let articleComments = comments.filter((c) => c.article === article);
        for (const comment of articleComments) {
            console.log(`--- From user ${comment.user}: ${comment.title} - ${comment.content}`);
        }
    }
}