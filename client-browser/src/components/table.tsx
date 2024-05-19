import { FC, useEffect, useState, version } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import {
  Button,
  Form,
  FormControl,
  Modal,
  Row,
  Spinner,
} from "react-bootstrap";
import { getModules } from "../api/get-modules";
import removeMarkdown from "markdown-to-text";
import { Link } from "wouter";
import axios from "axios";
import { useCamera } from "../providers/camera-providers";

type ModuleRecord = {
  name: string;
  description: string;
  version: string;
};

export const Table: FC = () => {
  const [records, setRecords] = useState<ModuleRecord[]>([]);
  const [recordsLoading, setRecordsLoading] = useState(true);
  const [downloadLoading, setDownloadLoading] = useState(false);
  const [selectedRows, setSelectedRows] = useState<ModuleRecord[]>([]);
  const [search, setSearch] = useState("");
  const [selectedDevices, setSelectedDevices] = useState<
    Record<string, boolean>
  >({});

  const [showModal, setShowModal] = useState(false);

  const { cameras, loading: cameraLoading } = useCamera();

  const downloadSelected = async () => {
    try {
      setDownloadLoading(true);
      const selectedDevicesIp = Object.entries(selectedDevices)
        .filter(Boolean)
        .map(([ip]) => ip);

      const modules = selectedRows.map((row) => ({
        name: row.name,
        version: row.version,
      }));

      console.log("Modules to download:", modules);

      await axios.post(`http://localhost:5000/install-modules`, {
        addresses: selectedDevicesIp,
        modules,
      });

      setShowModal(false);
      setSelectedRows([]);
    } catch (error) {
      console.error("Error sending modules to Flask:", error);
    } finally {
      setDownloadLoading(false);
    }
  };

  useEffect(() => {
    getModules()
      .then((data) => {
        setRecords(data);
        setRecordsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setRecordsLoading(false);
      });
  }, []);

  const filterRecords = () =>
    records.filter((record) =>
      record.name.toLowerCase().includes(search.toLowerCase())
    );

  const columns: TableColumn<(typeof records)[0]>[] = [
    {
      name: "Name",
      cell: (row) => <Link to={`/modules/${row.name}`}>{row.name}</Link>,
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Description",
      selector: (row) => row.description,
      cell: (row) => {
        let text = row.description ? removeMarkdown(row.description) : "";
        if (text.length > 50) text = text.substring(0, 50) + "...";
        return <span>{text}</span>;
      },
      sortable: true,
    },
    {
      name: (
        <Button
          className="ms-auto"
          onClick={() => setShowModal(true)}
          disabled={
            selectedRows.length === 0 || cameraLoading || downloadLoading
          }
        >
          {downloadLoading ? "Downloading..." : "Download Selected"}
        </Button>
      ),
      sortable: false,
    },
  ];

  if (recordsLoading)
    return (
      <Row>
        <Spinner className="m-auto" />
      </Row>
    );

  return (
    <>
      <div>
        <FormControl
          type="text"
          className="mb-2"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <DataTable
          columns={columns}
          data={filterRecords()}
          fixedHeader
          pagination
          selectableRows
          onSelectedRowsChange={(state) => setSelectedRows(state.selectedRows)}
        />
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Devices</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {cameras.map((camera) => (
              <Form.Check
                key={camera.ip}
                type="checkbox"
                label={camera.ip}
                id={camera.ip}
                onChange={(e) => {
                  setSelectedDevices({
                    ...selectedDevices,
                    [camera.ip]: e.target.checked,
                  });
                }}
              />
            ))}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={downloadSelected}>
            {downloadLoading
              ? "Downloading..."
              : "Download to selected devices"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
