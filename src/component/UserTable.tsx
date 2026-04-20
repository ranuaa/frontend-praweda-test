import { Table, Input, Button, Select } from "antd";
import { useMemo, useState } from "react";
import { useUsers } from "../hooks/useUser"; 
import { User } from "../types/user";

export default function UserTable() {
  const { data, loading, page, setPage, limit, setLimit } = useUsers();
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    if (!search) return data;

    return data.filter((u) =>
      u.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [data, search]);

  const isLastPage = data.length < limit;

  const columns = [
    { title: "Nama", dataIndex: "name" },
    { title: "Umur", dataIndex: "age" },
    { title: "Alamat", dataIndex: "location" },
    { title: "Email", dataIndex: "email" },
    { title: "No. Telepon 1", dataIndex: "phone" },
    { title: "No. Telepon 2", dataIndex: "cell" },
    {
      title: "Gambar",
      render: (_: any, record: User) => (
        <img src={record.picture[0]} width={80} />
      ),
    },
  ];

  return (
    <div style={{ padding: 20 }}>
      <h2>List</h2>

      {/* 🔥 SEARCH + LIMIT SELECT */}
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
        <Input.Search
          placeholder="Search"
          onChange={(e) => setSearch(e.target.value)}
          style={{ width: 300 }}
        />

        <div style={{ display: "flex", gap: 10 }}>
          {/* 🔥 SELECT PAGE SIZE */}
          <Select
            value={limit}
            style={{ width: 120 }}
            onChange={(value) => {
              setPage(1);     
              setLimit(value);
            }}
            options={[
              { value: 5, label: "5 / page" },
              { value: 10, label: "10 / page" },
              { value: 20, label: "20 / page" },
            ]}
          />

          <Button type="primary">+ New Data</Button>
        </div>
      </div>

      <Table
        columns={columns}
        dataSource={filtered}
        loading={loading}
        rowKey="email"
        pagination={false}
      />

      <div style={{ marginTop: 20, display: "flex", justifyContent: "center", gap: 10 }}>
        <Button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Prev
        </Button>

        <span>Page {page}</span>

        <Button
          disabled={false}
          onClick={() => setPage(page + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
}