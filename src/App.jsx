import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios';

function App() {
  // array di test
  // const studentsTest = [
  //   { name: 'Alice Smith', course: 'Matematica', status: 'attivo' },
  //   { name: 'Bob Johnson', course: 'Fisica', status: 'inattivo' },
  //   { name: 'Charlie Brown', course: 'Informatica', status: 'attivo' },
  //   { name: 'David Lee', course: 'Economia', status: 'attivo' },
  //   { name: 'Eve Williams', course: 'Biologia', status: 'inattivo' },
  //   { name: 'Frank Miller', course: 'Matematica', status: 'attivo' },
  //   { name: 'Grace Davis', course: 'Storia', status: 'attivo' },
  //   { name: 'Henry Wilson', course: 'Fisica', status: 'inattivo' },
  //   { name: 'Ivy Moore', course: 'Informatica', status: 'attivo' },
  //   { name: 'Jack Taylor', course: 'Arte', status: 'inattivo' },
  //   { name: 'Kelly Green', course: 'Letteratura', status: 'attivo' },
  //   { name: 'Liam Brown', course: 'Biologia', status: 'attivo' },
  //   { name: 'Mia Davis', course: 'Economia', status: 'inattivo' },
  //   { name: 'Noah Wilson', course: 'Storia', status: 'attivo' },
  //   { name: 'Olivia Moore', course: 'Arte', status: 'attivo' },
  //   { name: 'Peter Taylor', course: 'Letteratura', status: 'inattivo' }
  // ];

  const courses = ["Matematica", "Fisica", "Storia", "Informatica", "Letteratura", "Biologia", "Economia", "Arte"];

  //varibile di stato per salvare gli studenti
  const [students, setStudents] = useState([])
  //variabile per compilazione del form
  const [form, setForm] = useState({ name: '', course: '', status: 'active' });


  const endpoint = "https://jsonplaceholder.typicode.com/users";

  useEffect(() => {
    axios.get(endpoint)
      .then(response => {
        const usersFromApi = response.data.map(user => ({
          id: user.id,
          name: user.name,
          //numero intero per scegliere il corso di studi a random usando indice
          course: courses[Math.floor(Math.random() * courses.length)],
          // numero random (0 o 1)
          status: Math.round(Math.random()) === 0 ? "active" : "inactive"

        }));
        setStudents(usersFromApi);
        console.log(usersFromApi);
      })
      .catch(error => {
        console.error("Errore nel caricamento degli utenti:", error);

      });
  }, []);


  //funzione che rileva il cambiamento nell'input
  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  //funzione per invio del form
  function handleSubmit(e) {
    e.preventDefault();
    setStudents(prevStudents => [...prevStudents, form]);
    setForm({ name: '', course: '', status: 'active' });
  };


  return (
    <>
      <main className="container">
        <h1>Gestione Studenti</h1>

        <div id="status-message" className="status-message"></div>

        <section className="form-section">
          <h2>Aggiungi Studente</h2>
          <form id="student-form" onSubmit={handleSubmit}>
            <label>
              Nome:
              <input type="text" name="name" value={form.name} onChange={handleChange} required />
            </label>
            <label>
              Corso:
              <input type="text" name="course" value={form.course} onChange={handleChange} required />
            </label>
            <label>
              Stato:
              <select name="status" value={form.status} onChange={handleChange} required>
                <option value="active">Attivo</option>
                <option value="inactive">Inattivo</option>
              </select>
            </label>
            <button type="submit">Aggiungi</button>
          </form>
        </section>

        <section className="filter-section">
          <h2>Filtra</h2>
          <input type="text" id="filter-name" placeholder="Filtra per nome" />
          <input type="text" id="filter-course" placeholder="Filtra per corso" />
        </section>

        <section className="list-section">
          <div className="list-header">
            <h2>Elenco Studenti</h2>
            <div className="sort-controls">
              <label>Ordina per:</label>
              <select id="sort-by">
                <option value="name">Nome</option>
                <option value="course">Corso</option>
              </select>
            </div>
          </div>

          <ul id="student-list">
            {students.map((student, index) => (
              <li key={index} className={student.status === 'inactive' ? 'inactive' : ''}>
                <div>
                  <strong>{student.name}</strong> - {student.course}
                  <span className="status">({student.status})</span>
                </div>
                <div className="actions">
                  <button className="edit-btn">Modifica</button>
                  <button className="delete-btn">Elimina</button>
                </div>
                <form className="edit-form">
                  <label>
                    Nome:
                    <input type="text" name="name" onChange={handleChange} value={student.name} />
                  </label>
                  <label>
                    Corso:
                    <input type="text" name="course" onChange={handleChange} value={student.course} />
                  </label>
                  <label>
                    Stato:
                    <select name="status" onChange={handleChange} value={student.status}>
                      <option value="active">Attivo</option>
                      <option value="inactive">Inattivo</option>
                    </select>
                  </label>
                  <button type="submit">Salva modifiche</button>
                </form>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </>
  )
}

export default App
