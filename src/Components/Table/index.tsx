// import React, { useMemo } from "react";
// import {
//   useReactTable,
//   SortingState,
//   getSortedRowModel,
//   useFilters,
//   useGlobalFilter,
//   Column,
//   ColumnDef,
// } from "@tanstack/react-table";
// import { User } from "../../types/user";

// interface Data {
//   id: number;
//   name: string;
//   username: string;
//   email: string;
// }

// // Define data
// const data: Data[] = [
//   { id: 1, name: "John", username: "johndoe", email: "john@example.com" },
//   { id: 2, name: "Jane", username: "janedoe", email: "jane@example.com" },
//   { id: 3, name: "Bob", username: "bobsmith", email: "bob@example.com" },
//   { id: 4, name: "Alice", username: "alicewhite", email: "alice@example.com" },
// ];

// // Define columns
// const columns: Column<Data>[] = [
//   { Header: "ID", accessor: "id" },
//   { Header: "Name", accessor: "name" },
//   { Header: "Username", accessor: "username" },
//   { Header: "Email", accessor: "email" },
// ];

// // Define a global filter for searching
// function GlobalFilter({
//   preGlobalFilteredRows,
//   globalFilter,
//   setGlobalFilter,
// }: {
//   preGlobalFilteredRows: Data[];
//   globalFilter: string | undefined;
//   setGlobalFilter: (value: string | undefined) => void;
// }) {
//   const count = preGlobalFilteredRows.length;
//   return (
//     <div>
//       <input
//         type="text"
//         value={globalFilter || ""}
//         onChange={(e) => setGlobalFilter(e.target.value)}
//         placeholder={`Search ${count} records...`}
//       />
//     </div>
//   );
// }

// function Table() {
//   const rerender = React.useReducer(() => ({}), {})[1];

//   const [sorting, setSorting] = React.useState<SortingState>([]);

//   const columns = React.useMemo<ColumnDef<User>[]>(
//     () => [
//       {
//         header: "Name",
//         footer: (props) => props.column.id,
//         columns: [
//           {
//             accessorKey: "firstName",
//             cell: (info) => info.getValue(),
//             footer: (props) => props.column.id,
//           },
//           {
//             accessorFn: (row) => row.lastName,
//             id: "lastName",
//             cell: (info) => info.getValue(),
//             header: () => <span>Last Name</span>,
//             footer: (props) => props.column.id,
//           },
//         ],
//       },
//       {
//         header: "Info",
//         footer: (props) => props.column.id,
//         columns: [
//           {
//             accessorKey: "age",
//             header: () => "Age",
//             footer: (props) => props.column.id,
//           },
//           {
//             header: "More Info",
//             columns: [
//               {
//                 accessorKey: "visits",
//                 header: () => <span>Visits</span>,
//                 footer: (props) => props.column.id,
//               },
//               {
//                 accessorKey: "status",
//                 header: "Status",
//                 footer: (props) => props.column.id,
//               },
//               {
//                 accessorKey: "progress",
//                 header: "Profile Progress",
//                 footer: (props) => props.column.id,
//               },
//             ],
//           },
//           {
//             accessorKey: "createdAt",
//             header: "Created At",
//           },
//         ],
//       },
//     ],
//     []
//   );

//   const [data, setData] = React.useState(() => makeData(100000));
//   const refreshData = () => setData(() => makeData(100000));

//   const table = useReactTable({
//     data,
//     columns,
//     state: {
//       sorting,
//     },
//     onSortingChange: setSorting,
//     getCoreRowModel: getCoreRowModel(),
//     getSortedRowModel: getSortedRowModel(),
//     debugTable: true,
//   });

//   return (
//     <div className="p-2">
//       <div className="h-2" />
//       <table>
//         <thead>
//           {table.getHeaderGroups().map((headerGroup) => (
//             <tr key={headerGroup.id}>
//               {headerGroup.headers.map((header) => {
//                 return (
//                   <th key={header.id} colSpan={header.colSpan}>
//                     {header.isPlaceholder ? null : (
//                       <div
//                         {...{
//                           className: header.column.getCanSort()
//                             ? "cursor-pointer select-none"
//                             : "",
//                           onClick: header.column.getToggleSortingHandler(),
//                         }}
//                       >
//                         {flexRender(
//                           header.column.columnDef.header,
//                           header.getContext()
//                         )}
//                         {{
//                           asc: " 🔼",
//                           desc: " 🔽",
//                         }[header.column.getIsSorted() as string] ?? null}
//                       </div>
//                     )}
//                   </th>
//                 );
//               })}
//             </tr>
//           ))}
//         </thead>
//         <tbody>
//           {table
//             .getRowModel()
//             .rows.slice(0, 10)
//             .map((row) => {
//               return (
//                 <tr key={row.id}>
//                   {row.getVisibleCells().map((cell) => {
//                     return (
//                       <td key={cell.id}>
//                         {flexRender(
//                           cell.column.columnDef.cell,
//                           cell.getContext()
//                         )}
//                       </td>
//                     );
//                   })}
//                 </tr>
//               );
//             })}
//         </tbody>
//       </table>
//       <div>{table.getRowModel().rows.length} Rows</div>
//       <div>
//         <button onClick={() => rerender()}>Force Rerender</button>
//       </div>
//       <div>
//         <button onClick={() => refreshData()}>Refresh Data</button>
//       </div>
//       <pre>{JSON.stringify(sorting, null, 2)}</pre>
//     </div>
//   );
// }

// export default Table;

import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
} from "@chakra-ui/react";
import { User } from "../../types/user";
import { useState } from "react";
import UserCard from "../UserCard";

type Props = {
  users: User[];
};

const UserTable: React.FC<Props> = ({ users }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  return (
    <TableContainer>
      <Table variant="striped" colorScheme="gray">
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Name</Th>
            <Th>Username</Th>
            <Th>Email</Th>
            <Th>More Info</Th>
          </Tr>
        </Thead>
        <Tbody>
          {users.map((user) => (
            <Tr key={user.id}>
              <Td>{user.id}</Td>
              <Td>{user.name}</Td>
              <Td>{user.username}</Td>
              <Td>{user.email}</Td>
              <Td>
                <Button
                  colorScheme="teal"
                  onClick={() => {
                    setSelectedUser(user);
                    onOpen();
                  }}
                >
                  View Details
                </Button>
              </Td>
            </Tr>
          ))}
          <Modal isOpen={isOpen} onClose={onClose} size="3xl">
            <ModalOverlay />
            <ModalContent>
              {selectedUser && (
                <>
                  {" "}
                  <ModalHeader>
                    <Text>View User</Text>
                  </ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    <UserCard user={selectedUser} />
                  </ModalBody>
                  <ModalFooter>
                    {/* <Button colorScheme="teal" mr={3} onClick={onClose}>
                      Close
                    </Button> */}
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default UserTable;
