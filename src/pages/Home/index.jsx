
import React, { useEffect, useState } from 'react';
import { Card } from '../../components/Card';
import './styles.css';


export function Home() {
  const [studentName, setStudentName] = useState();
  const [students, setStudents] = useState([]);
  const [user, setUser] = useState({ name: '', avatar: '' })


  function handleAddStudent() {
    const newStudent = {
      name: studentName,
      time: new Date().toLocaleTimeString("pt-BR", {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      })
    }

    setStudents(prevState => [...prevState, newStudent]);
  }


  useEffect(() => {
    fetch('https://api.github.com/users/diego-lopes')
      .then(response => response.json())
      .then(data => setUser({ name: data.name, avatar: data.avatar_url }))
  }, [])
  return (
    <div className="container">
      <header>
        <h1>Lista de Presença</h1>
        <div>
          <strong>{user.name}</strong>
          <img src={user.avatar} alt="foto de perfil" />
        </div>
      </header>
      <input
        type="text"
        placeholder="Digite o nome..."
        onChange={e => setStudentName(e.target.value)}
      />
      <button type="button" onClick={handleAddStudent}>Adicionar</button>

      <small className="countAluno">{
        students.length <= 1 && students.length >= 1 ? (`${students.length} aluno presente`) : students.length > 0 && `${students.length} alunos presentes`
      }</small>
      {students.map((student, index) => <Card key={index} name={student.name} time={student.time} />)}

    </div>
  )
}

