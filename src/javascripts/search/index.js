import 'bootstrap';
import $ from 'jquery';
import '../../stylesheets/common/importers/_bootstrap.scss';
import '../../../node_modules/font-awesome/scss/font-awesome.scss';
import 'jbox/dist/jBox.all.css';
import 'lazysizes';
import '../../stylesheets/index/styles.scss';
import { initializeRouter } from '../common/utils';
import apiClient from '../../api/api-client';
import '../../stylesheets/common/partials/sidebar.scss';

const loader = () => ` <div class="text-center mx-auto mt-4">
<img src="images/tm/loader.gif" alt="loader" class="w-100" />
</div>`;

const renderSearch = () => {
  const renderCard = (profile) => `<div class="card custom-card col-lg-2
  col-md-4 rounded-75 mr-3 mb-3 column justify-content-between" >
    <img class="card-img-top" src="${profile.avatar_url}" alt="login">
    <div class="card-body d-flex flex-column justify-content-between">
      <h5 class="card-title">${profile.name || profile.login}</h5>
      <p class="card-text">${profile.bio || ''}</p>
      <a href="${profile.html_url}" class="custom-btn btn btn-primary">Knock Knock</a>
    </div>
  </div>`;

  const searchForProfiles = () => {
    $('#profilesList').html(loader());
    $('#search').attr('disabled', true);
    $('#search').addClass('disabled');
    $('#search span').text('Searching...');

    apiClient.search($('#searchinput').val()).then((response) => {
      $('#search').attr('disabled', false);
      $('#search span').text('Search');
      const { profiles } = response;
      $('#profilesList').empty();
      if (profiles.length === 0) {
        $('#profilesList').append('<h3>No results found</h3>');
      } else {
        profiles.forEach((profile) => {
          $('#profilesList').append(renderCard(profile));
        });
      }
    });
  };

  $('#search').on('click', () => {
    searchForProfiles();
  });

  $('#searchinput').on('keyup', (e) => {
    if (e.keyCode === 13) {
      searchForProfiles();
    }
  });

  //  if searchinput is empty, clear the list
  $('#searchinput').on('keyup', () => {
    if ($('#searchinput').val() === '') {
      $('#profilesList').empty();
    }
  });
};

$(() => {
  initializeRouter([['/search', renderSearch]]);
});
