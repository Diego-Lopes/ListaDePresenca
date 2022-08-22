
import { useEffect, useState } from 'react';
import { Card, CardProps } from '../../components/Card';
import './styles.css';

type ProfileResponse = {
  name: string;
  avatar_url: string;
}

type User = {
  name: string;
  avatar: string;
}

export function Home() {
  const [studentName, setStudentName] = useState<string>("");
  const [students, setStudents] = useState<CardProps[]>([]);
  const [user, setUser] = useState<User>({} as User)


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

    setStudentName("");
  }


  useEffect(() => {
    async function featchData() {
      const response = await fetch('https://api.github.com/users/diego-lopes');
      const data = await response.json() as ProfileResponse;

      setUser({
        name: data.name,
        avatar: data.avatar_url
      })

    }

    featchData();

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
        value={studentName}
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

