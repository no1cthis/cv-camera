import { FC, useEffect, useState } from "react";
import { getClient } from "../../proto-client";
import { arrayBufferToBase64 } from "../../utils/array-buffer-to-base-64";
import {
  Alert,
  Button,
  Col,
  Form,
  Modal,
  ModalProps,
  Row,
  Spinner,
} from "react-bootstrap";
import { FaTrash } from "react-icons/fa";

import { FaEdit } from "react-icons/fa";

export type ModuleVideoProps = {
  module: string;
  ip: string;
};

export const ModuleVideoMock: FC<ModuleVideoProps> = (props) => {
  const [image, setImage] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [showLogs, setShowLogs] = useState(false);
  const [showWhiteList, setShowWhiteList] = useState(false);
  const [loading, setLoading] = useState(true);
  const { ip, module } = props;

  useEffect(() => {
    const fetchImage = async () => {
      const client = getClient(ip);

      const { response } = await client.getLastFrame({ module });

      const uint8Array = new Uint8Array(response.frame);
      const base64String = arrayBufferToBase64(uint8Array);
      const image = `data:image/jpeg;base64,${base64String}`;
      setImage(image);
      if (loading) setLoading(false);
    };

    const intervalId = setInterval(fetchImage, 1000 / 60); // Target 60 FPS

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  if (loading) return <Spinner className="d-flex m-auto" />;

  if (!image) return null;

  return (
    <div className="card mb-4">
      <div className="card-header">
        <i className="fas fa-chart-pie me-1"></i>
        {module}
      </div>
      <div className="card-body p-0">
        <img src={image} alt="test" className="w-100 h-100" />
      </div>
      <div className="card-footer small text-muted d-flex justify-content-evenly">
        <Button onClick={() => setShowWhiteList(true)}>White List</Button>
        <Button onClick={() => setShowLogs(true)}>Logs</Button>
        <Button
          variant={isOpen ? "danger" : "success"}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {isOpen ? "Close" : "Open"} Gate
        </Button>
      </div>
      <LogsModal show={showLogs} onHide={() => setShowLogs(false)} />
      <WhiteListModal
        show={showWhiteList}
        onHide={() => setShowWhiteList(false)}
      />
    </div>
  );
};

const LogsModal: FC<ModalProps> = (props) => {
  const logs = [
    { name: "Stella Francis", date: "2021-09-01 12:00:00" },
    { name: "Mark Francis", date: "2021-09-01 12:03:20" },
    { name: "Amanda Francis", date: "2021-09-01 12:05:50" },
  ].map((log) => (
    <Alert>
      <Row>
        <Col className="text-center">{log.name}</Col>
        <Col className="text-center">{log.date}</Col>
      </Row>
    </Alert>
  ));
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title
          id="contained-modal-title-vcenter"
          className="d-flex m-auto"
        >
          Activity
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>{logs}</Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

const WhiteListModal: FC<ModalProps> = (props) => {
  const list = [
    { name: "Stella Francis", numberPlate: "BHA55XM" },
    { name: "Mark Francis", numberPlate: "VT16091" },
  ].map((item) => (
    <Alert>
      <Row>
        <Col>
          {item.name}
          <br />
          <strong>{item.numberPlate}</strong>
        </Col>
        <Col sm={4}>
          <div className="h-100 d-flex">
            <div className="d-flex ms-auto my-auto">
              <FaEdit color={"black"} size={32} className="mx-2" />{" "}
              <FaTrash color={"b81414"} size={32} />
            </div>
          </div>
        </Col>
      </Row>
    </Alert>
  ));
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title
          id="contained-modal-title-vcenter"
          className="d-flex m-auto"
        >
          White List
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row>
            <Col>
              <Form.Control className="my-2" placeholder="Enter Name" />
              <Form.Control className="my-2" placeholder="Enter number plate" />
            </Col>
            <Col sm={4}>
              <div className="h-100 d-flex">
                <Button className="d-flex m-auto px-4 py-2">Submit</Button>
              </div>
            </Col>
          </Row>
          {list}
        </Form>
      </Modal.Body>
      {/* <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer> */}
    </Modal>
  );
};
