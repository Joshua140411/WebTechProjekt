document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementsByClassName("container") != null) {
        document.getElementsByClassName("container").item(0).addEventListener("click", function() {
            let headers = document.getElementsByTagName("a");
            if(headers.length > 0) {
                let i = 0;
                while(i < 2) {
                    if (headers[i].style.visibility === "visible") {
                        headers[i].style.visibility = "collapse";
                    } else {
                        headers[i].style.visibility = "visible";
                    }
                    i++;
                }
            }
        });
    }
});