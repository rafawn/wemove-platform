<?php

use App\Core\Fundation\Clock\Clock;

it('returns the current instant', function () {
    $now = Clock::now();

    expect($now)->toBeInstanceOf(DateTimeImmutable::class);
});
