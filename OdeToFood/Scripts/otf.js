$(function () {
    var ajaxFormSubmit = function () {
        var $form = $(this);
        var options = {
            url: $form.attr("action"),
            type: $form.attr("method"),
            data: $form.serialize()
        };

        $.ajax(options).done(function (data) {

            var $target = $($form.attr("data-otf-target"));
            var $newHtml = $(data);

            $target.replaceWith($newHtml);
            $newHtml.effect("highlight");
        });

        return false;
    };

    var submitAutocompleteForm = function (event, ui) {

        var $input = $(this); //the label
        $input.val(ui.item.label); //done just in case the input hasnt changed yet

        var $form = $input.parents("form:first");
        $form.submit();
    };

    var createAutocomplete = function () {

        var $input = $(this);
        var options = {
            source: $input.attr("data-otf-autocomplete"),
            select: submitAutocompleteForm //select is what function is called when something in autocomplete is clicked
        };

        $input.autocomplete(options);
    };

    $("form[data-otf-ajax='true']").submit(ajaxFormSubmit);

    $("input[data-otf-autocomplete]").each(createAutocomplete);
});