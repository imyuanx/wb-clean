(() => {
    let deleteComment = (commentId) => {
        return new Promise((resolve, reject) => {
            let http = new XMLHttpRequest();
            http.onreadystatechange = (e) => {
                if(http.readyState == 4) resolve();
            }
            http.open("post", `https://weibo.com/aj/comment/del?ajwvr=6&__rnd=${new Date().getTime()}`);
            http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            http.send(`cid=${commentId}&_t=0`);
        });
    }
    
    function main() {
        let taskList = [];
        [].forEach.call(document.getElementsByClassName("WB_cardwrap"), (ele, i) => {
            const commentId = ele.getAttribute("comment_id");
            const task = deleteComment(commentId);
            taskList.push(task);
        });
        Promise.all(taskList).then(() => {
            console.log("end");
            alert("删除完成");
        });
    }
    
    function insertDom() {
        const delBtn = document.createElement("a");
        delBtn.text = "删除当页评论";
        delBtn.className = "page next S_txt1 S_line1";
        delBtn.onclick = () => window.main(),
        document.getElementsByClassName("W_pages")[0].appendChild(delBtn)
    }
    
    // TODO: 浏览器插件
    // insertDom()
    
    main()
})();