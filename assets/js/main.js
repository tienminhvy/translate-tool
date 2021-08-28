tinymce.init({
    selector: '#raw-content',
    plugins: 'autoresize',
});
tinymce.init({
    selector: '#translated-content',
});

let raw_content_height;
// create an Observer instance
const resizeObserver1 = new ResizeObserver(entries => {

    raw_content_height = $(tinymce.get('raw-content').getContainer()).height();
    $(tinymce.get('translated-content').getContainer()).height(raw_content_height);

})

setTimeout(() => {
    resizeObserver1.observe(tinymce.get('raw-content').getContainer()); 
}, 1500);

let pre_defineds = [
    {
        name: "Example",
        desc: "Example pre-defined content",
        content: `
            <p>Example content here</p>
        `,
    }
];

// 
let html_predefined = '', pd_i = 1;

html_predefined = "<p><span class='badge bg-danger'>Warning</span>: If you press <b>insert this</b> button, all your content in translated textarea will be replaced!</p>";
pre_defineds.forEach(pre_defined => {
    html_predefined += "<hr>";
    html_predefined += "<h3>" + pre_defined.name + "</h3>"
    html_predefined += "<p>" + pre_defined.desc + "</p>"
    html_predefined += "<code>" + pre_defined.content + "</code>"
    html_predefined += `<button id='pd_${pd_i}' class='btn btn-warning'>Insert this</button>`
    html_predefined += "<hr>";
    pd_i++;
})



$('#btnInsertPredefined').click(e => {
    Swal.fire({
        title: 'Insert pre-defined content',
        icon: 'info',
        html: html_predefined
    });

    for (let i = 0; i < pre_defineds.length; i++) {
        $(`#pd_${i+1}`).click(e => {
            tinymce.get('translated-content').setContent(pre_defineds[i].content);
            Swal.close()
            Swal.fire({
                title: 'Insert pre-defined content',
                icon: 'success',
                text: 'Content inserted successfully'
            });
        })
    }
})

$('#btnAbout').click(e => {
    Swal.fire({
        title: 'About this project',
        icon: 'info',
        text: "I made this project for everyone who want to translate language of copied thing more easier to do. Project published with GPL v3 license",
        footer: '<a href="https://tienminhvy.com" style="text-decoration: none">Made with 💖 by Tiền Minh Vy</a>'
    });
})