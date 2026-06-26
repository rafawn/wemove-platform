<?php

declare(strict_types=1);

namespace App\Core\Fundation\Clock;

use DateTimeImmutable;

final class Clock
{
    public static function now(): DateTimeImmutable
    {
        return new DateTimeImmutable();
    }
}
