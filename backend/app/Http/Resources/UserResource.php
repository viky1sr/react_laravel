<?php

namespace App\Http\Resources;

use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'mahasiswa_id' => $this->id,
            'mahasiswa_name' => $this->name,
            'mahasiswa_email' => $this->email,
            'mahasiswa_nim' => $this->nim,
            'role' => $this->roles[0]->name,
//            'created_at' => Carbon::parse($this->created_at)->format('d m Y'),
//            'updated_at' => Carbon::parse($this->updated_at)->format('d m Y'),
        ];
    }
}
