// import React, { useState } from "react";
// import { db, storage } from "../../db/firebase";
// import { useAuth } from "../../contexts/authContext";
// import { Form, Button } from "react-bootstrap";

// export const EmployeForm = () => {
//   const { currentUser } = useAuth();
//   const [employee, setEmployee] = useState({
//     name: "",
//     email: "",
//     hiringDate: "",
//     cpf: "",
//     address: {
//       street: "",
//       cep: "",
//       neighborhood: "",
//       city: "",
//       state: "",
//     },
//     status: "ativo",
//     photo: null,
//   });

  

//   const handleFormSubmit = async (e) => {
//     e.preventDefault();
//     const storageRef = storage.ref();
//     const fileRef = storageRef.child(photo.name);
//     const fileSnapshot = await fileRef.put(photo);
//     const fileUrl = await fileSnapshot.ref.getDownloadURL();
//     await db.collection("employee").add({
//       ...employee,
//       photo: fileUrl,
//       userId: currentUser.uid,
//     });
//     setEmployee({});
//   };

//   return (
//     <Form onSubmit={handleFormSubmit}>
//       <Form.Group controlId="formName">
//         <Form.Label>Nome</Form.Label>
//         <Form.Control
//           type="text"
//           value={name}
//           onChange={(e) => setEmployee(e.target.value)}
//         />
//       </Form.Group>

//       <Form.Group controlId="formEmail">
//         <Form.Label>Email</Form.Label>
//         <Form.Control
//           type="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//       </Form.Group>

//       <Form.Group controlId="formHiringDate">
//         <Form.Label>Data de contratação</Form.Label>
//         <Form.Control
//           type="date"
//           value={hiringDate}
//           onChange={(e) => setHiringDate(e.target.value)}
//         />
//       </Form.Group>

//       <Form.Group controlId="formCpf">
//         <Form.Label>CPF</Form.Label>
//         <Form.Control
//           type="text"
//           value={cpf}
//           onChange={(e) => setCpf(e.target.value)}
//         />
//       </Form.Group>
//       <Form.Group controlId="formAddress">
//         <Form.Label>Endereço</Form.Label>
//         <Form.Control
//           type="text"
//           placeholder="Rua"
//           value={address.street}
//           onChange={(e) =>
//             setAddress((prevState) => ({
//               ...prevState,
//               street: e.target.value,
//             }))
//           }
//         />

//         <Form.Control
//           type="text"
//           placeholder="CEP"
//           value={address.cep}
//           onChange={(e) =>
//             setAddress((prevState) => ({
//               ...prevState,
//               cep: e.target.value,
//             }))
//           }
//         />
//         <Form.Control
//           type="text"
//           placeholder="Bairro"
//           value={address.neighborhood}
//           onChange={(e) =>
//             setAddress((prevState) => ({
//               ...prevState,
//               neighborhood: e.target.value,
//             }))
//           }
//         />

//         <Form.Control
//           type="text"
//           placeholder="Cidade"
//           value={address.city}
//           onChange={(e) =>
//             setAddress((prevState) => ({
//               ...prevState,
//               city: e.target.value,
//             }))
//           }
//         />

//         <Form.Control
//           type="text"
//           placeholder="Estado"
//           value={address.state}
//           onChange={(e) =>
//             setAddress((prevState) => ({
//               ...prevState,
//               state: e.target.value,
//             }))
//           }
//         />
//       </Form.Group>

//       <Button variant="primary" type="submit">
//         Cadastrar
//       </Button>
//     </Form>
//   );
// };
