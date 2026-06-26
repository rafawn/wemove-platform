<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class MakeEnLangJsonCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:make-en-lang-json-command';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Generate translations en.json from es.json';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('🚀 Generating en.json file...');

        $esPath = lang_path('es.json');
        $enPath = lang_path('en.json');

        if (! file_exists($esPath)) {
            $this->error('❌ The file es.json does not exist.');

            return Command::FAILURE;
        }

        if (! file_exists($enPath)) {
            $this->warn('⚠️ It doesn\'t exist en.json, a new one will be created...');
            file_put_contents($enPath, json_encode([], JSON_PRETTY_PRINT));
        }

        $es = json_decode(file_get_contents($esPath), true);
        $en = json_decode(file_get_contents($enPath), true);

        $this->line('📖 Processing translations...');

        $bar = $this->output->createProgressBar(count($es));
        $bar->start();

        foreach ($es as $key => $_) {
            $en[$key] = $key;
            $bar->advance();
        }

        $bar->finish();
        $this->newLine(2);

        file_put_contents(
            $enPath,
            json_encode($en, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES)
        );

        $this->info('✅ en.json file generated successfully.');
        $this->line('📂 Path: '.$enPath);

        return Command::SUCCESS;
    }
}
