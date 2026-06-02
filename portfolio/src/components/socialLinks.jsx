import { Nav } from 'react-bootstrap';

function socialLinks() {
    return (
        <>
            <Nav className="justify-content-center">
                <Nav.Item>
                    <Nav.Link
                        href="mailto:viveksharma40649@gmail.com" 
                        aria-label="Email"
                        className="text-body-secondary"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="26"
                            height="26"
                            fill="currentColor"
                            className="bi bi-envelope-fill"
                            viewBox="0 0 16 16"
                        >
                            <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555z" />
                            <path d="M0 4.697v7.104l5.803-3.558L0 4.697z" />
                            <path d="M6.761 8.83 0 12.803A2 2 0 0 0 2 14h12a2 2 0 0 0 2-1.197L9.239 8.83 8 9.586 6.761 8.83z" />
                            <path d="M16 4.697l-5.803 3.546L16 11.801V4.697z" />
                        </svg>
                    </Nav.Link>
                </Nav.Item>

                <Nav.Item>
                    <Nav.Link
                        href="https://github.com/vivek-007-bit"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="GitHub"
                        className="text-body-secondary"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="26"
                            height="26"
                            fill="currentColor"
                            className="bi bi-github"
                            viewBox="0 0 16 16"
                        >
                            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 
                              0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13
                              -.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66
                              .07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15
                              -.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.68 7.68 0 0 1 2-.27c.68
                              0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82
                              1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01
                              1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
                        </svg>
                    </Nav.Link>
                </Nav.Item>

                <Nav.Item>
                    <Nav.Link
                        href="https://www.linkedin.com/in/vivek-sharma-dev7/"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="LinkedIn"
                        className="text-body-secondary"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="26"
                            height="26"
                            fill="currentColor"
                            className="bi bi-linkedin"
                            viewBox="0 0 16 16"
                        >
                            <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.356-.554 1.356-1.247-.015-.708-.519-1.246-1.341-1.246-.822 0-1.356.538-1.356 1.246 0 .693.519 1.247 1.327 1.247h.014zm4.908 8.212V9.359c0-.213.015-.426.078-.579.171-.426.562-.868 1.218-.868.859 0 1.202.655 1.202 1.615v3.913h2.401V9.28c0-2.22-1.182-3.25-2.757-3.25-1.27 0-1.845.707-2.165 1.205h.015v-1.036H6.65c.03.678 0 7.225 0 7.225h2.401z" />
                        </svg>
                    </Nav.Link>
                </Nav.Item>
            </Nav>
        </>
    );
}

export default socialLinks;
