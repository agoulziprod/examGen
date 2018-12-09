// hada var dial les test li ghankhchih f input  search
// var tests = [
//     { title: 'Andorra' },
//     { title: 'United Arab Emirates' },
//     { title: 'Afghanistan' },
//     { title: 'Antigua' },
//     { title: 'Anguilla' },
//     { title: 'Albania' },
//     { title: 'Armenia' },
//     { title: 'Netherlands Antilles' },
//     { title: 'Angola' },
//     { title: 'Argentina' },
//     { title: 'American Samoa' },
//     { title: 'Austria' },
//     { title: 'Australia' },
//     { title: 'Aruba' },
//     { title: 'Aland Islands' },
//     { title: 'Azerbaijan' },
//     { title: 'Bosnia' },
//     { title: 'Barbados' },
//     { title: 'Bangladesh' },
//     { title: 'Belgium' },
//     { title: 'Burkina Faso' },
//     { title: 'Bulgaria' },
//     { title: 'Bahrain' },
//     { title: 'Burundi' }
//     // etc
//   ];

//   daba initialize search input
//   $('.ui.search')
//   .search({
//     source: tests
//   })
// ;


// initialize message close o dkchi
$('.message .close')
  .on('click', function () {
    $(this)
      .closest('.message')
      .transition('fade')
      ;
  })
  ;

// o hna skafandri dial checkbox
$('.ui.checkbox')
  .checkbox()
  ;
  
  $('.ui.search')
  .search({

    source: tests
    ,
    apiSettings: {
      url: '//api.github.com/search/repositories?q={query}'
    },
    fields: {
      url: '//api.github.com/search/repositories?q={query}'
    },
    minCharacters: 3
  });

  $('select.dropdown')
  .dropdown()
;