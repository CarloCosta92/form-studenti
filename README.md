## Milestone 1 – Visualizzazione dinamica
Trasforma l’HTML in componenti React

Usa useState per visualizzare dinamicamente gli studenti

Avvia con un array statico di esempio (minimo 2 studenti)

## Milestone 2 – Fetch da API esterna + struttura studenti

Crea un array locale di corsi, es.:

["Matematica", "Fisica", "Storia", "Informatica", "Letteratura", "Biologia", "Economia", "Arte"]

Fai una richiesta GET a https://jsonplaceholder.typicode.com/users usando useEffect

Mappa la risposta per ottenere oggetti con questo formato:

{
  id: user.id,
  name: user.name,
  course: corso random dalla lista,
  status: valore casuale tra "active" / "inactive"
}

Inserisci questi studenti nello stato

## Milestone 3 – Aggiunta studente

Collega il form allo stato

Al submit:

Valida i dati

Aggiungi il nuovo studente immutabilmente

Mostra messaggio di conferma

Resetta il form

## Milestone 4 – Filtri e Ordinamento


Filtro live su name e course


Ordinamento per nome o corso tramite select

