<?php

test('the home page redirects guests to sign-in', function () {
    $response = $this->get('/');

    $response->assertRedirect(route('user.signin'));
});
