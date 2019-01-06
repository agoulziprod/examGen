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
  });


  $('select.dropdown')
  .dropdown()
  ;

// o hna skafandri dial checkbox
$('.ui.checkbox')
  .checkbox()
  ;
//accordion dial ajouter des reponses
$('.ui.accordion')
  .accordion()
;
$('.ui.radio.checkbox')
  .checkbox()
;
$('.menu .item')
  .tab()
;
// ila kan chi table sortable nsortiwh malo ykhla3na
$('table').tablesort();


$('.ui.search')
.search({

  source: tests
  ,
  fields: {
    url: '//api.github.com/search/repositories?q={query}'
  },
  minCharacters: 1,
  action: 'search',
  action: {
    url: '//api.github.com/search/repositories?q={query}',
    text: "View all 202 results"
  }
});

