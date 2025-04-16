<?php

namespace App\Http\Controllers;

use App\Models\personaje;
use Illuminate\Http\Request;
use function PHPUnit\Framework\isEmpty;
use App\Models\origin;

/**
 *   @OA\Info(
 *     title="Prueba técnica - Infotegra",
 *     version="1.0.0",
 *     description="Documentación del Backend creada.",
 *     @OA\Contact(
 *         email="nemiasvasquezs@hotmail.com"
 *     )
 * )
 * @OA\Tag(
 *     name="Personajes",
 *     description="Gestión de Personajes."
 * )
 */
class PersonajeController
{
    /**
     * @OA\Get(
     *     path="/obtenerPersonajes",
     *     summary="Obtener todos los personajes",
     *     description="Retorna una lista de personajes.",
     *     tags={"Personajes"},
     *     @OA\Response(
     *         response=200,
     *         description="Listado de personajes",
     *     ),
     *     @OA\Response(response=404, description="No se hane encontrado personajes registrados.")
     * )
     */
    public function index()
    {
        $personajes = Personaje::with('origin')->get();
        if ($personajes->isEmpty()) {
            return response()->json(['alert' => 'No se han registrado personajes']);
        }
        return response()->json(['personajes' => $personajes], 200);
    }

    private function validarRequest(Request $request)
    {
        $request->validate([
            'id' => 'required'
        ]);
    }

    private function validarExistencia(Request $request)
    {
        $nombre = Personaje::where('name', $request->name)->where('id', '!=', $request->id)->first();
        if ($nombre)
            abort(response()->json(['alert' => 'Ya existe el nombre en otro registro.'], 400));
    }


    private function guardar(Personaje $personaje, Request $request, bool $actualizar)
    {
        $personaje->id = $request->id;
        $personaje->name = $request->name ?? null;
        $personaje->status = $request->status ?? null;
        $personaje->species = $request->species ?? null;
        $personaje->image = $request->image ?? null;
        $personaje->type = $request->type ?? null;
        $personaje->gender = $request->gender ?? null;

        $personaje->save();

        $origin = $actualizar ? Origin::where('id', $request->id)->first() : new Origin();

        $origin->id = $request->id;
        $origin->name = $request->origin['name'] ?? null;
        $origin->url = $request->origin['url'] ?? null;

        $origin->save();
    }

    /**
     * @OA\Post(
     *     path="/guardarListaPersonajes",
     *     summary="Guardar la lista de personajes",
     *     description="Guarda los 100 registros de la API R&M",
     *     tags={"Personajes"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"personajes"},
     *             @OA\Property(property="personajes", type="list", example="[{personaje}...]"),
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Listado de personajes guardada",
     *     ),
     *     @OA\Response(response=400, description="Error en los datos al guardar la lista.")
     * )
     */
    public function guardarListaPersonajes(Request $request)
    {
        $personajes = Personaje::count();
        if ($personajes >= 100) {
            return response()->json(['alert' => 'Ya se han registrado los 100 personajes']);
        }

        $lista = $request->all();

        foreach ($lista as $item) {
            $personaje = new Personaje();
            $this->guardar($personaje, new Request($item), false);
        }

        return response()->json(['message' => 'Se han registrado los datos correctamente'], 200);
    }

    /**
     * @OA\Post(
     *     path="/actualizarPersonaje/{id}",
     *     summary="Actualizar un Personaje",
     *     tags={"Personajes"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"id"},
     *             @OA\Property(property="id", type="string", example="1"),
     *         )
     *     ),
     *   @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"id"},
     *             @OA\Property(property="id", type="string", example="1"),
     *         )
     *     ),
     *    @OA\RequestBody(
     *         required=false,
     *         @OA\JsonContent(
     *             required={"name, status, specie,image, type ,gender, origin"},
     *             @OA\Property(property="name", type="string", example="personaje"),
     *             @OA\Property(property="status", type="string", example="alive"),
     *             @OA\Property(property="image", type="string", example="https:/..."),
     *             @OA\Property(property="type", type="string", example="personaje"),
     *             @OA\Property(property="gender", type="string", example="female"),
     *             @OA\Property(property="origin", type="object", example="{name:'origin',url:'https:/...'}"),
     *         )
     *     ),
     *     @OA\Response(response=404, description="Personaje no encontrado"),
     *     @OA\Response(response=200, description="Personaje actualizado exitosamente"),
     *     @OA\Response(response=400, description="Formato de datos inválidos"),
     * )
     */
    public function update(Request $request, string $id)
    {
        $this->validarRequest($request);
        $this->validarExistencia($request);
        $personaje = Personaje::findOrFail($id);
        if (!$personaje)
            return response()->json(['alert' => 'No se ha encontrado el personaje.'], 404);
        $this->guardar($personaje, $request, true);
        return response()->json(['message' => 'Se ha actualizado con éxito el personaje'], 200);
    }
}
