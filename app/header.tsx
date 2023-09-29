"use client"

import Link from "next/link"
import { Container, Nav, Navbar } from "react-bootstrap"

export default function Header() {
    return <Navbar>
        <Container>
            <Navbar.Brand as={Link} href="/">Dog Breeds</Navbar.Brand>
            <Nav>
                <Nav.Link as={Link} href="/">Gallery</Nav.Link>
                <Nav.Link as={Link} href="/favorites">Favorites</Nav.Link>
            </Nav>
        </Container>
    </Navbar>
}