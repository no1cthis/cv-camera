from scapy.all import ARP, Ether, srp
def scan_network(ip_range, results):
    arp_request = ARP(pdst=ip_range)
    ether = Ether(dst="ff:ff:ff:ff:ff:ff")
    packet = ether / arp_request
    result = srp(packet, timeout=1, verbose=False)[0]

    for sent, received in result:
        results.append({'ip': received.psrc, 'mac': received.hwsrc})