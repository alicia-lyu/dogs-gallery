"use client"

import { Container, Nav, Navbar } from "react-bootstrap"

export default function Header() {
    return <Navbar>
        <Container>
            <Navbar.Brand href="/">Dog Breeds</Navbar.Brand>
            <Nav>
                <Nav.Link href="/">Gallery</Nav.Link>
                <Nav.Link href="/wishlist">Wish List</Nav.Link>
            </Nav>
        </Container>
    </Navbar>
}