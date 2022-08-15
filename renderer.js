// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering

// process.
function handleFiles(fileInput){
    var files = fileInput.files;
    var objTo = document.getElementById('area');
    console.log(files)


    for(let i = 0; i < files.length; i++){
        let book = new ePub(files[i], {});

        book.ready.then(() => {
            book.coverUrl().then((url) => {
                    var x = document.createElement("IMG");
                    x.setAttribute("src", url);
                    x.setAttribute("id", "cover")
                    objTo.appendChild(x);

                    var y = document.createElement("BUTTON")
                    y.setAttribute("class", "bookButton")
                    y.setAttribute("id", "coverButton")
                    y.appendChild(document.createTextNode(files[i].name.slice(0, -5)))

                    y.onclick = function(){


    var params = URLSearchParams && new URLSearchParams(document.location.search.substring(1));
    var url = params && params.get("url") && decodeURIComponent(params.get("url"));
    var currentSectionIndex = (params && params.get("loc")) ? params.get("loc") : undefined;

    // Load the opf
    var book = ePub(url || files[i]);
    var rendition = book.renderTo("viewer", {
      // width: "100%",
      // height: 800,
      spread: "always"
    });

    var img = document.getElementById('cover');
    img.style.visibility = 'hidden';
    img.style.position = "absolute"
    var img = document.getElementById("remover");
    img.style.visibility = "visible";

    rendition.display(currentSectionIndex);

    book.ready.then(() => {

      var next = document.getElementById("next");
      next.addEventListener("click", function(e){
        book.package.metadata.direction === "rtl" ? rendition.prev() : rendition.next();
        e.preventDefault();
      }, false);

      var prev = document.getElementById("prev");
      prev.addEventListener("click", function(e){
        book.package.metadata.direction === "rtl" ? rendition.next() : rendition.prev();
        e.preventDefault();
      }, false);

      var keyListener = function(e){

        // Left Key
        if ((e.keyCode || e.which) == 37) {
          book.package.metadata.direction === "rtl" ? rendition.next() : rendition.prev();
        }

        // Right Key
        if ((e.keyCode || e.which) == 39) {
          book.package.metadata.direction === "rtl" ? rendition.prev() : rendition.next();
        }

      };

      rendition.on("keyup", keyListener);
      document.addEventListener("keyup", keyListener, false);

    })

    var title = document.getElementById("title");

    rendition.on("rendered", function(section){
      var current = book.navigation && book.navigation.get(section.href);

      if (current) {
        var $select = document.getElementById("toc");
        var $selected = $select.querySelector("option[selected]");
        if ($selected) {
          $selected.removeAttribute("selected");
        }

        var $options = $select.querySelectorAll("option");
        for (var i = 0; i < $options.length; ++i) {
          let selected = $options[i].getAttribute("ref") === current.href;
          if (selected) {
            $options[i].setAttribute("selected", "");
          }
        }
      }

    });

    rendition.on("relocated", function(location){
      console.log(location);

      var next = book.package.metadata.direction === "rtl" ?  document.getElementById("prev") : document.getElementById("next");
      var prev = book.package.metadata.direction === "rtl" ?  document.getElementById("next") : document.getElementById("prev");

    //   if (location.atEnd) {
    //     next.style.visibility = "hidden";
    //   } else {
    //     next.style.visibility = "visible";
    //   }

    //   if (location.atStart) {
    //     prev.style.visibility = "hidden";
    //   } else {
    //     prev.style.visibility = "visible";
    //   }

    });

    rendition.on("layout", function(layout) {
      let viewer = document.getElementById("viewer");

      if (layout.spread) {
        viewer.classList.remove('single');
      } else {
        viewer.classList.add('single');
      }
    });

    window.addEventListener("unload", function () {
      console.log("unloading");
      this.book.destroy();
    });

    book.loaded.navigation.then(function(toc){
			var $select = document.getElementById("toc"),
					docfrag = document.createDocumentFragment();

			toc.forEach(function(chapter) {
				var option = document.createElement("option");
				option.textContent = chapter.label;
				option.setAttribute("ref", chapter.href);

				docfrag.appendChild(option);
			});

			$select.appendChild(docfrag);

			$select.onchange = function(){
					var index = $select.selectedIndex,
							url = $select.options[index].getAttribute("ref");
					rendition.display(url);
					return false;
			};

		});
    };
                    objTo.appendChild(y)
                    resolve()
                });
        })
    }
}

function removeBook(){
    var viewBook = document.getElementById("viewer");
    viewBook.remove()

    var img = document.getElementById("remover");
    img.style.visibility = "hidden";

    var books = document.getElementById('cover');
    var booksButton = document.getElementById('coverButton');
    books.style.visibility = 'visible';
    booksButton.style.transform = "translate(0)";
}