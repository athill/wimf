<?php

namespace App\Social;

use App\User;

use Log;

class GithubServiceProvider extends AbstractServiceProvider
{
   /**
     *  Handle Facebook response
     * 
     *  @return Illuminate\Http\Response
     */
    public function handle()
    {
        $user = $this->provider->user();
        Log::info(json_encode($this->provider->user()));

        $existingUser = User::where('settings->github_id', $user->id)->first();

        if ($existingUser) {
            $settings = $existingUser->settings;

            if (! isset($settings['github_id'])) {
                $settings['github_id'] = $user->id;
                $existingUser->settings = $settings;
                $existingUser->save();
            }

            return $this->login($existingUser);
        }

        $newUser = $this->register([
            'name' => $user->getName(),
            'email' => $user->getEmail(),
            'settings' => [
                'github_id' => $user->id,                
            ]
        ]);        

        return $this->login($newUser);
    }       
}