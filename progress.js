$(function(){
    let $progressBar = $('.progress-bar');
    let $input = $('input[type="number"]');

    $input.change(function(){
        let percent = $input.val();
        console.log(percent);
        $progressBar.text(percent);
        $progressBar.css('width', percent + '%');
    }

    );
});