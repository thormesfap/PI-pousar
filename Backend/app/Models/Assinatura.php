<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use App\Models\Plano;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Assinatura extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'parcelas'
    ];

    protected $table = 'assinatura';

    public function ciaAerea(): BelongsTo
    {
        return $this->belongsTo(CiaAerea::class);
    }
    public function formaPagamento(): BelongsTo
    {
        return $this->belongsTo(FormaPagamento::class);
    }
    public function plano(): BelongsTo
    {
        return $this->belongsTo(Plano::class);
    }
    public function pagamentos(): HasMany
    {
        return $this->hasMany(Pagamento::class);
    }
}
