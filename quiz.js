/*
 * Kana Master Quiz 0.1.0
 *
 * mono.company
 * Copyright 2015, Mono
*/

(function($) {
  $.fn.kanamasterQuiz = function(options) {

    var $quizScore = 0;
    var $quizQuestions = $('.quiz__item').length;

    // Set total
    $('.quiz-results__result__questioncount').html($quizQuestions);
    
    window.setTimeout(function() {
      $('.quiz__item--active .quiz__item__input').focus();
    }, 200)
    
    

    $('.quiz__item__input').change(function(e) {
      inputField = $(this);
      quizQuestion = $(this).parents('.quiz__item').find('.quiz__item__question').html();
      quizAnswer = $(this).parents('.quiz__item').find('.quiz__item__answer').html();
      inputtedValue = $(this).val();
      onQuizInput(inputtedValue, inputField, quizAnswer, quizQuestion);
    });

    function onQuizInput(inputtedValue, inputField, quizAnswer, quizQuestion) {

      // Validate input
      quizValidateInput(inputtedValue, inputField, quizAnswer, quizQuestion);

      // Navigate through questions
      quizNavigate();

    }

    function quizValidateInput(inputtedValue, inputField, quizAnswer, quizQuestion) {
      
      // console.log('Field is ' + inputField.attr('class'));

      var correctAnswer = quizAnswer;

      // Get correct answer
      // console.log('The correct answer: ' + correctAnswer);
      // console.log('The inputted value: ' + inputtedValue);
      
      if (correctAnswer == inputtedValue) {
        $quizScore++;
        console.log('Score is now: ' + $quizScore);
        $('.quiz-results__result__self').html($quizScore);
        
        $('.feedback--positive').addClass('feedback--anim');
        window.setTimeout(function() {
          $('.feedback--positive').removeClass('feedback--anim');
        }, 1200)

      } else {
        console.log('Score is still: ' + $quizScore);

        var mistakeRow = "<tr><td>" + quizQuestion + "</td><td>" + inputtedValue + "</td><td>" + correctAnswer + "</td></tr>";
        // A mistake was made, let's log in in the table
        $('.quiz-results__mistakes').removeClass('hide').find('tbody').append(mistakeRow);
        
      }
    }

    function quizNavigate() {

      currentQuizItem = $('.quiz__item--active');
      currentQuizItem.removeClass('quiz__item--active');

      // If the quiz item is the last item
      if (currentQuizItem.is(':last-child')) {
        // Show quiz finished screen
        console.log('Quiz finished!');
        $('.quiz').addClass('hide');
        $('.quiz-finish').removeClass('hide').addClass('quiz-finish--anim');

        $('.quiz-finish__view-score-btn').focus();
        // View score
        $('.quiz-finish__view-score-btn').click(function(e) {
          $(this).parents('.quiz-finish').addClass('hide');
          
          // Check for perfect score whn you arrive at score screen
          if ($quizScore == $quizQuestions) {
            console.log($quizScore);
            console.log($quizQuestions);
            $('.quiz-results__perfect').removeClass('hide');
          }

          $('.quiz-results').removeClass('hide').addClass('quiz-results--anim');
          
          $('.quiz-results__again-btn').focus();
          $('.quiz-results__again-btn').click(function(e) {
            // Implement way to try again, reset score to 0 and come back to first slide
            location.reload();
          });
        });
      } else {
        // View the next question
        console.log('Next question!!');
        currentQuizItem.next().addClass('quiz__item--active');
        $('.quiz__item--active .quiz__item__input').focus();
      }

    }

  };
})(jQuery);

$(document).ready(function() {

  $('body').kanamasterQuiz();

});