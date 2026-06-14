export const useWhatsApp = () => {
  const config = useRuntimeConfig()
  const number = config.public.whatsappNumber

  const generalLink = () => {
    const msg = encodeURIComponent("Hi, I found you on your website and I'd like to enquire about your vehicles.")
    return `https://wa.me/${number}?text=${msg}`
  }

  const vehicleLink = (vehicle: { year: number | string; make: string; model: string; id: string }) => {
    const msg = encodeURIComponent(`Hi, I'm interested in the ${vehicle.year} ${vehicle.make} ${vehicle.model} (Ref: AR-${vehicle.id}). Is it still available?`)
    return `https://wa.me/${number}?text=${msg}`
  }

  return {
    generalLink,
    vehicleLink
  }
}
