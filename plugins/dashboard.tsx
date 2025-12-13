import { DashboardIcon } from "@sanity/icons"
import { Card, Stack, Heading, Grid, Button, Box, Text, Flex } from "@sanity/ui"
import { useEffect, useState } from "react"
import { useRouter } from "sanity/router"

export function DashboardWidget() {
  const router = useRouter()
  const [stats, setStats] = useState({
    projects: 0,
    services: 0,
    skills: 0,
    testimonials: 0,
  })

  useEffect(() => {
    // Fetch stats from Sanity
    async function fetchStats() {
      const client = (await import("@sanity/client")).createClient({
        projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "sjl39asi",
        dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
        apiVersion: "2025-01-01",
        useCdn: false,
      })

      const [projects, services, skills, testimonials] = await Promise.all([
        client.fetch('count(*[_type == "project"])'),
        client.fetch('count(*[_type == "service"])'),
        client.fetch('count(*[_type == "skill"])'),
        client.fetch('count(*[_type == "testimonial"])'),
      ])

      setStats({ projects, services, skills, testimonials })
    }

    fetchStats()
  }, [])

  const cards = [
    {
      title: "Projekty",
      count: stats.projects,
      icon: "🎨",
      color: "#6366f1",
      path: "/project",
      description: "Spravujte své portfolio projektů",
    },
    {
      title: "Služby",
      count: stats.services,
      icon: "🛠️",
      color: "#8b5cf6",
      path: "/service",
      description: "Vaše nabízené služby",
    },
    {
      title: "Dovednosti",
      count: stats.skills,
      icon: "⚡",
      color: "#ec4899",
      path: "/skill",
      description: "Technologie a nástroje",
    },
    {
      title: "Reference",
      count: stats.testimonials,
      icon: "⭐",
      color: "#f59e0b",
      path: "/testimonial",
      description: "Hodnocení od klientů",
    },
  ]

  return (
    <Card padding={4}>
      <Stack space={4}>
        <Box>
          <Heading size={3}>📊 Přehled portfolia</Heading>
          <Text muted size={1} style={{ marginTop: "8px" }}>
            Rychlý přístup ke všem sekcím vašeho portfolia
          </Text>
        </Box>

        <Grid columns={[1, 2, 4]} gap={3}>
          {cards.map((card) => (
            <Card
              key={card.title}
              padding={4}
              radius={3}
              shadow={1}
              style={{
                background: `linear-gradient(135deg, ${card.color}15 0%, ${card.color}05 100%)`,
                border: `2px solid ${card.color}40`,
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
              tone="transparent"
              onClick={() => router.navigate(card.path)}
            >
              <Stack space={3}>
                <Flex align="center" justify="space-between">
                  <Text size={4}>{card.icon}</Text>
                  <Text
                    size={3}
                    weight="bold"
                    style={{ color: card.color }}
                  >
                    {card.count}
                  </Text>
                </Flex>
                <Box>
                  <Text size={2} weight="semibold">
                    {card.title}
                  </Text>
                  <Text muted size={1} style={{ marginTop: "4px" }}>
                    {card.description}
                  </Text>
                </Box>
                <Button
                  text="Otevřít"
                  mode="ghost"
                  tone="primary"
                  style={{
                    background: card.color,
                    color: "white",
                  }}
                  onClick={(e) => {
                    e.stopPropagation()
                    router.navigate(card.path)
                  }}
                />
              </Stack>
            </Card>
          ))}
        </Grid>

        <Card padding={4} radius={2} shadow={1} tone="primary">
          <Stack space={3}>
            <Heading size={2}>🚀 Rychlé akce</Heading>
            <Grid columns={[1, 2]} gap={3}>
              <Button
                text="➕ Nový projekt"
                tone="positive"
                mode="default"
                style={{
                  background: "#22c55e",
                  color: "white",
                  padding: "16px",
                  fontSize: "16px",
                }}
                onClick={() => router.navigate("/intent/create/template=project")}
              />
              <Button
                text="➕ Nová služba"
                tone="primary"
                mode="default"
                style={{
                  background: "#6366f1",
                  color: "white",
                  padding: "16px",
                  fontSize: "16px",
                }}
                onClick={() => router.navigate("/intent/create/template=service")}
              />
              <Button
                text="➕ Nová dovednost"
                tone="caution"
                mode="default"
                style={{
                  background: "#f59e0b",
                  color: "white",
                  padding: "16px",
                  fontSize: "16px",
                }}
                onClick={() => router.navigate("/intent/create/template=skill")}
              />
              <Button
                text="➕ Nová reference"
                tone="critical"
                mode="default"
                style={{
                  background: "#ec4899",
                  color: "white",
                  padding: "16px",
                  fontSize: "16px",
                }}
                onClick={() => router.navigate("/intent/create/template=testimonial")}
              />
            </Grid>
          </Stack>
        </Card>
      </Stack>
    </Card>
  )
}

export const dashboardConfig = {
  name: "portfolio-dashboard",
  title: "Dashboard",
  icon: DashboardIcon,
  component: DashboardWidget,
}
