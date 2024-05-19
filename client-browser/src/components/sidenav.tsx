import { FC } from "react";
import { Button, Spinner } from "react-bootstrap";
import { useCamera } from "../providers/camera-providers";
import { Link } from "wouter";

export const Sidenav: FC = () => {
  const { cameras, loading, refresh } = useCamera();

  const deviceList = cameras.map(({ ip }, index) => (
    <Link
      className={`nav-link ${index === 0 ? "pt-0" : ""}`}
      href={`/camera/${ip}`}
      key={ip}
    >
      <div className="sb-nav-link-icon">
        <i className="fas fa-tachometer-alt"></i>
      </div>
      {ip}
    </Link>
  ));

  return (
    <div id="layoutSidenav_nav">
      <nav
        className="sb-sidenav accordion sb-sidenav-dark"
        id="sidenavAccordion"
      >
        <div className="sb-sidenav-menu">
          <div className="nav">
            <div className="sb-sidenav-menu-heading d-flex justify-content-between">
              <div>Cameras</div>
              <Button
                size="sm"
                variant="secondary"
                className="py-0"
                onClick={refresh}
              >
                Refresh
              </Button>
            </div>
            {loading ? <Spinner className="m-auto" /> : deviceList}
          </div>
        </div>
      </nav>
    </div>
  );
};
