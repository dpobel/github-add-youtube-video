// ==UserScript==
// @name        github add youtube
// @namespace   damien@pobel.fr
// @include     https://github.com/*
// @version     1
// @grant       none
// ==/UserScript==

(function () {

    function addButton (group) {
        var button = group.querySelector('.toolbar-item:last-of-type').cloneNode(true);

        button.setAttribute('aria-label', "Add a Youtube video");
        button.setAttribute('data-ga-click', "");
        // https://simpleicons.org/icons/youtube.svg
        // + class="octicon"
        // + width="20"
        // + height="16"
        // -viewBox
        button.innerHTML = '<svg class="octicon" width="20" height="16" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="1.414"><path d="M0 7.345c0-1.294.16-2.59.16-2.59s.156-1.1.636-1.587c.608-.637 1.408-.617 1.764-.684C3.84 2.36 8 2.324 8 2.324s3.362.004 5.6.166c.314.038.996.04 1.604.678.48.486.636 1.588.636 1.588S16 6.05 16 7.346v1.258c0 1.296-.16 2.59-.16 2.59s-.156 1.102-.636 1.588c-.608.638-1.29.64-1.604.678-2.238.162-5.6.166-5.6.166s-4.16-.037-5.44-.16c-.356-.067-1.156-.047-1.764-.684-.48-.487-.636-1.587-.636-1.587S0 9.9 0 8.605v-1.26zm6.348 2.73V5.58l4.323 2.255-4.32 2.24h-.002z"/></svg>';
        group.appendChild(button);

        return button;
    }

    function addMarkdown (textarea) {
        var vid,
            value = textarea.value;

        if ( textarea.selectionStart !== textarea.selectionEnd ) {
            vid = textarea.value.substring(textarea.selectionStart, textarea.selectionEnd).trim();
        } else {
            vid = window.prompt('Youtube video URL?');
        }
        vid = vid.replace(/.*v=([a-z0-9_-]+).*/gi, '$1');
        textarea.value = `${value.substring(0, textarea.selectionStart)}
[![](https://img.youtube.com/vi/${vid}/0.jpg)](http://www.youtube.com/watch?v=${vid} "Click to play on Youtube.com")
${value.substring(textarea.selectionEnd)}`;
    }

    function enhanceToolbar(commentForm) {
        var textarea = commentForm.querySelector('.comment-form-textarea'),
            toolbarGroup = commentForm.querySelector('.toolbar-group:last-of-type'),
            button;

        if ( !textarea || !toolbarGroup ) {
            return;
        }

        button = addButton(toolbarGroup);
        button.onclick = function (e) {
            e.stopPropagation();
            addMarkdown(textarea);
        };
    }

    Array.prototype.forEach.call(document.querySelectorAll('.previewable-comment-form'), enhanceToolbar);
})();
